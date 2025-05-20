import React, { useState, useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getSavedStories, saveSavedStories } from '../storage';
import { UserContext } from '../UserContext';

export default function Truyen({ route, navigation }) {
  const { story } = route.params;
  const [chapters] = useState(Array.isArray(story.chapters) ? story.chapters : []);
  const { user, updateUser } = useContext(UserContext);

  const defaultCoverImage = 'https://i.pinimg.com/736x/78/86/05/7886058e70a30e5e5bbc1a71a25f66fe.jpg';

  const getStoryId = (storyObj) => {
    if (storyObj._id && storyObj._id.$oid) return storyObj._id.$oid;
    if (typeof storyObj._id === 'string') return storyObj._id;
    return storyObj.id || storyObj.title;
  };

  const handleSaveStory = async () => {
    try {
      const savedStories = await getSavedStories(user.id);
      const currentStoryId = getStoryId(story);
      const newStory = {
        id: currentStoryId,
        title: story.title,
        coverImage: story.coverImage || defaultCoverImage,
        genres: story.genres || [],
        chapters: story.chapters || [], 
        description: story.description || story.details || '', 
      };

      const exists = savedStories.some(s => s.id === currentStoryId);
      if (!exists) {
        const updatedStories = [...savedStories, newStory];
        await saveSavedStories(user.id, updatedStories);
        await updateUser({ savedStories: updatedStories });
        Alert.alert('Thành công', 'Truyện đã được lưu!');
      } else {
        Alert.alert('Thông báo', 'Truyện này đã được lưu trước đó.');
      }
    } catch (error) {
      console.error('Lỗi khi lưu truyện:', error);
      Alert.alert('Lỗi', 'Không thể lưu truyện.');
    }
  };

  const handleChapterPress = (chapter) => {
    navigation.navigate('ChapterScreen', { chapter, chapters });
  };

  if (!story) return <Text>Đang tải...</Text>;

  const renderHeader = () => (
    <View>
      <Image
        source={{ uri: story.coverImage || defaultCoverImage }}
        style={styles.cover}
      />
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.genre}>Thể loại: {(story.genres || []).join(', ')}</Text>
      <Text style={styles.description}>{story.description || story.details || 'Không có mô tả.'}</Text>
      <Text style={styles.sectionTitle}>Danh sách chương:</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chapters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChapterPress(item)} style={styles.chapterItem}>
            <Text style={styles.chapterText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={renderHeader}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveStory}>
        <Text style={styles.saveButtonText}>Lưu Truyện</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1 },
  cover: { width: '100%', height: 200, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  genre: { fontSize: 16, color: '#555', marginVertical: 5 },
  description: { fontSize: 14, marginVertical: 10, lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  chapterItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  chapterText: { fontSize: 16 },
  saveButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
});
