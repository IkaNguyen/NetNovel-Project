// Info/Admin/ThemChuong.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from 'react-native';

export default function ThemChuong({ route, navigation }) {
  const { comicId } = route.params;

  const [chapterNumber, setChapterNumber] = useState('');
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [pages, setPages] = useState('');

  const handleSave = async () => {
    const newChapter = {
      chapter_number: parseInt(chapterNumber),
      title,
      pages: pages.split('\n').map(p => p.trim()),
      release_date: new Date(releaseDate),
    };

    try {
      const res = await fetch(`http://192.168.1.44:5000/index/${comicId}`);
      const comic = await res.json();

      if (!res.ok) throw new Error('Không lấy được truyện');

      const updatedChapters = [...comic.chapters, newChapter];

      const response = await fetch(`http://192.168.1.44:5000/index/${comicId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...comic, chapters: updatedChapters }),
      });

      if (!response.ok) throw new Error('Không thể thêm chương');

      Alert.alert('Thành công', 'Chương mới đã được thêm');
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi khi thêm chương:', error);
      Alert.alert('Lỗi', error.message || 'Không thể thêm chương');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Số chương</Text>
      <TextInput style={styles.input} value={chapterNumber} onChangeText={setChapterNumber} keyboardType="numeric" />

      <Text style={styles.label}>Tên chương</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Ngày phát hành (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={releaseDate} onChangeText={setReleaseDate} />

      <Text style={styles.label}>Danh sách ảnh (mỗi dòng là 1 URL)</Text>
      <TextInput
        style={[styles.input, { height: 120 }]}
        value={pages}
        onChangeText={setPages}
        multiline
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Lưu chương mới" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
