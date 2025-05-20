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
        author: story.author || 'Không rõ', 
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
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // nền rất nhẹ nhàng
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cover: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    backgroundColor: '#E5E5E5',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    marginTop: 16,
    letterSpacing: 0.5,
  },
  genre: {
    fontSize: 14,
    color: '#6E6E6E',
    marginTop: 8,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 15,
    color: '#4A4A4A',
    marginTop: 12,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3A3A3A',
    marginTop: 24,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
    paddingBottom: 6,
  },
  chapterItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  chapterText: {
    fontSize: 15,
    color: '#333',
  },
  saveButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#3D8361', // xanh olive hiện đại
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 28,
    shadowColor: '#3D8361',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
