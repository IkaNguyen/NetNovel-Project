import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, Modal, Button } from 'react-native';
import { getAllStories, saveAllStories } from '../storage';

export default function Seen({ navigation }) {
  const [allStories, setAllStories] = useState([]);
  const [editingStory, setEditingStory] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newGenre, setNewGenre] = useState('');
  const [newDetails, setNewDetails] = useState('');
  const [newCover, setNewCover] = useState(null);
  const [newChapterContent, setNewChapterContent] = useState('');

  // Lấy tất cả các truyện khi trang được load
  useEffect(() => {
    const fetchAllStories = async () => {
      const stories = await getAllStories();
      setAllStories(stories);
    };
    fetchAllStories();
  }, []);

  // Hàm xóa truyện
  const handleRemoveStory = async (storyId) => {
    try {
      const updatedStories = allStories.filter(story => story.id !== storyId);
      await saveAllStories(updatedStories);
      setAllStories(updatedStories);
      Alert.alert('Thông báo', 'Truyện đã được xóa');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể xóa truyện');
    }
  };

  // Hàm chỉnh sửa truyện
  const handleEditStory = async () => {
    if (!newTitle || !newGenre || !newDetails) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    const updatedStory = {
      ...editingStory,
      title: newTitle,
      genre: newGenre,
      details: newDetails,
      cover: newCover || editingStory.cover,
    };

    const updatedStories = allStories.map(story => (story.id === editingStory.id ? updatedStory : story));
    await saveAllStories(updatedStories);
    setAllStories(updatedStories);
    setEditingStory(null);
    Alert.alert('Thông báo', 'Truyện đã được chỉnh sửa');
  };

  // Hàm render truyện
  const renderStory = ({ item }) => (
    <View style={styles.storyItem}>
      <Text style={styles.storyTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleRemoveStory(item.id)}>
        <Text style={styles.removeButton}>Xóa</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleEditStoryModal(item)}>
        <Text style={styles.removeButton}>Sửa</Text>
      </TouchableOpacity>

      <FlatList
        data={item.chapters}
        renderItem={({ item, index }) => (
          <View style={styles.chapterItem}>
            <Text>{`Chương ${index + 1}: ${item.slice(0, 20)}...`}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Chap', { storyId: item.id, chapterIndex: index })}>
              <Text style={styles.removeButton}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(chapter, index) => index.toString()}
      />
    </View>
  );

  const handleEditStoryModal = (story) => {
    setEditingStory(story);
    setNewTitle(story.title);
    setNewGenre(story.genre);
    setNewDetails(story.details);
    setNewCover(story.cover);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Các truyện đã đăng</Text>
      <FlatList
        data={allStories}
        renderItem={renderStory}
        keyExtractor={item => item.id}
      />

{editingStory && (
  <Modal visible={editingStory !== null} onRequestClose={() => setEditingStory(null)}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Chỉnh sửa truyện</Text>
      <Text style={styles.modalDescription}>
        Bạn đang chỉnh sửa thông tin cho truyện: {editingStory.title}
      </Text>
      <Text style={styles.inputDescription}>Nhập tên truyện mới.</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên truyện"
        value={newTitle}
        onChangeText={setNewTitle}
      />
     <Text style={styles.inputDescription}>Nhập thể loại của truyện (ví dụ: Huyền bí, Tình cảm).</Text>


      <TextInput
        style={styles.input}
        placeholder="Thể loại truyện"
        value={newGenre}
        onChangeText={setNewGenre}
      />
       <Text style={styles.inputDescription}>Nhập mô tả chi tiết về truyện.</Text>

      <TextInput
        style={[styles.input, styles.textArea]} // Thêm kiểu cho ô mô tả chi tiết
        placeholder="Chi tiết truyện"
        value={newDetails}
        onChangeText={setNewDetails}
        multiline={true}
        numberOfLines={4} // Số dòng hiển thị ban đầu
      />
     
      <View style={styles.buttonGroup}>
        <Button title="Lưu thay đổi" onPress={handleEditStory} />
        <Button title="Hủy" onPress={() => setEditingStory(null)} />
      </View>
    </View>
  </Modal>
)}
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
  storyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storyTitle: {
    fontSize: 18,
  },
  removeButton: {
    color: 'red',
    fontSize: 16,
  },
  chapterItem: {
    paddingLeft: 20,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
 