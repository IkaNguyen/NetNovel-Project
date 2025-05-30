import React, { useState, useCallback, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { getSavedStories, removeSavedStory, saveSavedStories } from '../storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { UserContext } from '../UserContext';

const DEFAULT_IMAGE = 'https://i.pinimg.com/736x/68/2f/2d/682f2df1ad586e8dcc668214fcce3250.jpg';

export default function List() {
  const [savedStories, setSavedStories] = useState([]);
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchSavedStories = async () => {
        try {
          const stories = await getSavedStories(user.id);

          // ✅ Bổ sung author nếu thiếu
          const fixedStories = stories.map(story => ({
            ...story,
            author: story.author || 'Không rõ'
          }));

          // ✅ Nếu có sự thay đổi, lưu lại
          const changed = stories.some((s, i) => !s.author && fixedStories[i].author);
          if (changed) {
            await saveSavedStories(user.id, fixedStories);
          }

          setSavedStories(fixedStories);
        } catch (error) {
          Alert.alert('Lỗi', 'Không thể tải danh sách truyện đã lưu');
        }
      };

      fetchSavedStories();
      return () => {};
    }, [user])
  );

  const handleRemoveStory = async (storyId) => {
    try {
      await removeSavedStory(user.id, storyId);
      setSavedStories(prevStories => prevStories.filter(story => story.id !== storyId));
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể xóa truyện');
    }
  };

  const handlePressStory = (story) => {
    const storyWithChapters = {
      ...story,
      chapters: story.chapters || []
    };
    navigation.navigate('Truyen', { story: storyWithChapters });
  };

  const renderStory = ({ item }) => {
    const imageUri = item.coverImage?.trim() ? item.coverImage : DEFAULT_IMAGE;

    return (
      <TouchableOpacity onPress={() => handlePressStory(item)} style={styles.storyItem}>
        <Image
          source={{ uri: imageUri }}
          style={styles.coverImage}
          onError={() => console.warn('Lỗi load ảnh:', imageUri)}
        />
        <View style={styles.storyInfo}>
          <Text style={styles.storyTitle}>{item.title}</Text>
          <Text style={styles.storyAuthor}>Tác giả: {item.author || 'Không rõ'}</Text>
          <Text style={styles.chapterCount}>Số chương: {item.chapters?.length || 0}</Text>
        </View>
        <TouchableOpacity onPress={() => handleRemoveStory(item.id)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Xóa</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={savedStories}
        renderItem={renderStory}
        keyExtractor={item => item.id?.toString() || Math.random().toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10,  marginTop: 20 },
  storyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  coverImage: {
    width: 60,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
    marginRight: 10
  },
  storyInfo: {
    flex: 1,
    justifyContent: 'center'
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333'
  },
  storyAuthor: {
    fontSize: 14,
    color: '#666'
  },
  chapterCount: {
    fontSize: 13,
    color: '#999'
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
});
