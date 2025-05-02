import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllStories, saveAllStories } from '../storage';

export default function Truyen({ route, navigation }) {
    const { story } = route.params; // Nhận thông tin quyển truyện từ route
    const [chapters, setChapters] = useState(story.chapters); // Lấy danh sách chương từ story
  
    // Không cần fetchStory nữa vì đã nhận được thông tin từ Home
    const handleChapterPress = (chapter) => {
      navigation.navigate('ChapterScreen', { chapter });
    };
  
    if (!story) return <Text>Đang tải...</Text>;
  
    return (
      <ScrollView style={styles.container}>
        <Image source={{ uri: story.image }} style={styles.cover} />
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.genre}>Thể loại: {story.genre}</Text>
        <Text style={styles.detail}>{story.details}</Text>
  
        <Text style={styles.sectionTitle}>Danh sách chương:</Text>
        <FlatList
          data={chapters}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChapterPress(item)} style={styles.chapterItem}>
              <Text style={styles.chapterText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    );
  }

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  cover: { width: '100%', height: 200, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  genre: { fontSize: 16, color: '#555', marginVertical: 5 },
  detail: { fontSize: 14, marginVertical: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  chapterItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  chapterText: { fontSize: 16 }
});