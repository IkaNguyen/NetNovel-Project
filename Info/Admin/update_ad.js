import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  ScrollView, Button, Image, Alert
} from 'react-native';

export default function Update({ route, navigation }) {
  const { comic } = route.params;

  const [title, setTitle] = useState(comic.title);
  const [author, setAuthor] = useState(comic.author);
  const [description, setDescription] = useState(comic.description || '');
  const [genres, setGenres] = useState((comic.genres || []).join(', '));
  const [coverImage, setCoverImage] = useState(comic.coverImage || '');

  // Xử lý cập nhật truyện
  const handleUpdate = async () => {
    const updatedComic = {
      ...comic,
      title,
      author,
      description,
      genres: genres.split(',').map(g => g.trim()),
      coverImage,
    };

    try {
      const response = await fetch(`http://10.0.141.167:5000/index/${comic._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedComic),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(result);
        Alert.alert('Lỗi', result.message || 'Không thể cập nhật');
        return;
      }

      Alert.alert('Thành công', 'Truyện đã được cập nhật');
      navigation.navigate('ComicDetail', { comic: updatedComic });

    } catch (error) {
      console.error('Lỗi cập nhật:', error);
      Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ');
    }
  };

  // Xử lý xóa truyện (với xác nhận)
  const handleDelete = () => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa truyện này không?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Xóa truyện bị hủy'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const response = await fetch(`http://10.0.141.167:5000/index/${comic._id}`, {
                method: 'DELETE',
              });

              const result = await response.json();

              if (!response.ok) {
                console.error(result);
                Alert.alert('Lỗi', result.message || 'Không thể xóa truyện');
                return;
              }

              Alert.alert('Thành công', 'Truyện đã được xóa');
              navigation.goBack();  // Quay lại màn hình trước
            } catch (error) {
              console.error('Lỗi xóa truyện:', error);
              Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ để xóa truyện');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Ảnh bìa (URL)</Text>
      <TextInput style={styles.input} value={coverImage} onChangeText={setCoverImage} />
      {coverImage !== '' && (
        <Image source={{ uri: coverImage }} style={styles.image} />
      )}

      <Text style={styles.label}>Tên truyện</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Tác giả</Text>
      <TextInput style={styles.input} value={author} onChangeText={setAuthor} />

      <Text style={styles.label}>Thể loại (cách nhau bởi dấu phẩy)</Text>
      <TextInput style={styles.input} value={genres} onChangeText={setGenres} />

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Lưu truyện" onPress={handleUpdate} />
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="Xóa truyện" color="red" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
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
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

