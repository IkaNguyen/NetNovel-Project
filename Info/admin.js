import React, { useState, useEffect } from 'react';
import { TextInput, Button, View, StyleSheet, Alert, Image } from 'react-native';
import { getAllStories, saveAllStories } from './storage'; 
import * as ImagePicker from 'expo-image-picker'; 

export default function Admin() {
  const [storyId, setStoryId] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [details, setDetails] = useState('');
  const [chapters, setChapters] = useState('');
  const [imageUri, setImageUri] = useState(null); 
  const [allStories, setAllStories] = useState([]); 

  useEffect(() => {
    const fetchAllStories = async () => {
      const stories = await getAllStories(); 
      setAllStories(stories);
    };
    fetchAllStories();
  }, []);

  const handleSelectCoverImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: 'photo',
      quality: 0.5,
    });
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handleSaveStory = async () => {
    // Kiểm tra dữ liệu đầu vào
    if (!storyId || !title || !genre || !details || !chapters ) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    // Kiểm tra ID duy nhất
    const existingStory = allStories.find(story => story.id === storyId);
    if (existingStory) {
      Alert.alert('Thông báo', 'ID truyện đã tồn tại. Vui lòng sử dụng ID khác.');
      return;
    }

    const newStory = {
      id: storyId,
      title,
      genre,
      details,
      chapters: chapters.split(',').map(chapter => chapter.trim()), // Tách chuỗi chương truyện
      image: imageUri, 
      createdAt: new Date().toISOString(),
    };

    const updatedStories = [...allStories, newStory];

    await saveAllStories(updatedStories);
    Alert.alert('Thông báo', 'Truyện đã được lưu thành công');

    // Reset các trường nhập
    setStoryId('');
    setTitle('');
    setGenre('');
    setDetails('');
    setChapters('');
    setImageUri(null); // Đặt lại ảnh bìa
    setAllStories(updatedStories);  
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ID truyện"
        value={storyId}
        onChangeText={setStoryId}
      />
      <TextInput
        style={styles.input}
        placeholder="Tên truyện"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Thể loại truyện"
        value={genre}
        onChangeText={setGenre}
      />
      <TextInput
        style={styles.input}
        placeholder="Chi tiết truyện"
        value={details}
        onChangeText={setDetails}
      />
      <TextInput
        style={styles.input}
        placeholder="Danh sách chương (ngăn cách bằng dấu phẩy)"
        value={chapters}
        onChangeText={setChapters}
      />

      <Button title="Chọn ảnh bìa" onPress={handleSelectCoverImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      <Button title="Lưu truyện" onPress={handleSaveStory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
});