
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllStories, saveAllStories } from '../storage';  // Nếu saveAllStories là một hàm lưu vào AsyncStorage

export default function Chap({ route, navigation }) {
  const { storyId, chapterIndex } = route.params;
  const [chapterContent, setChapterContent] = useState('');
  const [allStories, setAllStories] = useState([]);

  // Lấy thông tin truyện khi trang được load
  useEffect(() => {
    const fetchAllStories = async () => {
      const stories = await getAllStories();
      const story = stories.find(s => s.id === storyId);
      setChapterContent(story.chapters[chapterIndex]);
      setAllStories(stories);
    };
    fetchAllStories();
  }, [storyId, chapterIndex]);

  // Hàm lưu lại nội dung chương sau khi chỉnh sửa vào AsyncStorage
  const handleSaveChapter = async () => {
    const updatedStories = allStories.map(story => {
      if (story.id === storyId) {
        story.chapters[chapterIndex] = chapterContent;  // Chỉnh sửa nội dung chương
      }
      return story;
    });

    try {
      await saveAllStories(updatedStories); // Lưu tất cả truyện đã cập nhật vào AsyncStorage
      Alert.alert('Thông báo', 'Chương đã được cập nhật');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu chương. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Chỉnh sửa chương</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={10}
        value={chapterContent}
        onChangeText={setChapterContent}
      />
      <Button title="Lưu thay đổi" onPress={handleSaveChapter} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
