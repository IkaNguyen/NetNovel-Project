import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getSavedStories, removeSavedStory } from '../storage'; // Import các hàm từ storage

export default function List() {
  const [savedStories, setSavedStories] = useState([]); // Dùng để lưu các truyện đã lưu

  // Lấy danh sách truyện đã lưu từ AsyncStorage khi component được render
  useEffect(() => {
    const fetchSavedStories = async () => {
      try {
        const stories = await getSavedStories(); // Lấy truyện đã lưu từ AsyncStorage
        setSavedStories(stories); // Cập nhật state với dữ liệu truyện đã lưu
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể tải danh sách truyện đã lưu');
      }
    };

    fetchSavedStories(); // Gọi hàm lấy truyện khi component được render
  }, []); // Chỉ chạy một lần khi component được mount

  // Hàm để xóa truyện khỏi danh sách đã lưu
  const handleRemoveStory = async (storyId) => {
    try {
      await removeSavedStory(storyId); // Xóa truyện khỏi AsyncStorage
      setSavedStories(prevStories => prevStories.filter(story => story.id !== storyId)); // Cập nhật lại state để xóa truyện khỏi danh sách
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể xóa truyện');
    }
  };

  const renderStory = ({ item }) => (
    <View style={styles.storyItem}>
      <Text style={styles.storyTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleRemoveStory(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Các truyện đã lưu</Text>
      <FlatList
        data={savedStories}
        renderItem={renderStory}
        keyExtractor={item => item.id.toString()} // Đảm bảo keyExtractor sử dụng ID đúng cách
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  sectionTitle: { fontSize: 20, marginBottom: 10 },
  storyItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between' },
  storyTitle: { fontSize: 18 },
  removeButton: { backgroundColor: 'red', padding: 5, borderRadius: 5 },
  removeButtonText: { color: 'white' },
});
