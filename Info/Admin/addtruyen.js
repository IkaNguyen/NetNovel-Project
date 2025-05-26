import React, { useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Text,
  Alert
} from 'react-native';

const ThemTruyen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genres, setGenres] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [description, setDescription] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterPages, setChapterPages] = useState('');
  const [chapterNumber, setChapterNumber] = useState('1');

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setGenres('');
    setCoverImage('');
    setDescription('');
    setChapterTitle('');
    setChapterPages('');
    setChapterNumber('1');
  };

  const handleSubmit = async () => {
    if (!title || !author || !genres || !chapterTitle || !chapterPages) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập đầy đủ các trường bắt buộc.');
      return;
    }

    const genreArray = genres.split(',').map(g => g.trim());
    const pageArray = chapterPages.split(',').map(p => p.trim());

    const newComic = {
      title,
      author,
      genres: genreArray,
      coverImage,
      description,
      chapters: [
        {
          chapter_number: parseInt(chapterNumber),
          title: chapterTitle,
          pages: pageArray,
          release_date: new Date().toISOString()
        }
      ],
      status: 'Ongoing',
      updatedAt: new Date().toISOString()
    };

    try {
      const response = await fetch('http://10.0.141.167:5000/index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComic)
      });

      const result = await response.json();

      if (response.ok && result) {
        Alert.alert('Thành công', 'Truyện đã được thêm thành công!', [
          {
            text: 'Xem chi tiết',
            onPress: () => {
              resetForm(); // 🔄 Reset form trước khi chuyển
              navigation.navigate('ComicDetail', { comic: result });
            }
          }
        ]);
      } else {
        Alert.alert('Lỗi', result.message || 'Không thể thêm truyện.');
      }
    } catch (error) {
      Alert.alert('Lỗi mạng', 'Không thể kết nối với máy chủ. Vui lòng thử lại sau.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Tiêu đề *</Text>
        <TextInput style={styles.input} onChangeText={setTitle} value={title} />

        <Text style={styles.label}>Tác giả *</Text>
        <TextInput style={styles.input} onChangeText={setAuthor} value={author} />

        <Text style={styles.label}>Thể loại (phân cách dấu phẩy) *</Text>
        <TextInput style={styles.input} onChangeText={setGenres} value={genres} />

        <Text style={styles.label}>Ảnh bìa (URL)</Text>
        <TextInput style={styles.input} onChangeText={setCoverImage} value={coverImage} />

        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          numberOfLines={4}
          onChangeText={setDescription}
          value={description}
        />

        <Text style={styles.label}>Chương số *</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setChapterNumber}
          value={chapterNumber}
        />

        <Text style={styles.label}>Tên chương *</Text>
        <TextInput style={styles.input} onChangeText={setChapterTitle} value={chapterTitle} />

        <Text style={styles.label}>Danh sách ảnh (phân cách dấu phẩy) *</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          onChangeText={setChapterPages}
          value={chapterPages}
          multiline
        />

        <Button title="Gửi truyện" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    backgroundColor: '#FAFAFA',
  },
  label: {
    marginTop: 12,
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: '#FFF',
  }
});

export default ThemTruyen;
