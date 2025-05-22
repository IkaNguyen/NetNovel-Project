import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Alert
} from 'react-native';

export default function Chuong({ route, navigation }) {
  const { comicId, chapterIndex, chapter } = route.params;

  const [chapterNumber, setChapterNumber] = useState(String(chapter.chapter_number));
  const [title, setTitle] = useState(chapter.title);
  const [pages, setPages] = useState(chapter.pages.join('\n'));
  const [releaseDate, setReleaseDate] = useState(
    new Date(chapter.release_date).toISOString().split('T')[0]
  );

  // ✅ Gửi PUT request để cập nhật chương trong mảng
  const handleSave = async () => {
    const updatedChapter = {
      chapter_number: parseInt(chapterNumber),
      title,
      pages: pages.split('\n').map(p => p.trim()),
      release_date: new Date(releaseDate),
    };

    try {
      // Lấy truyện gốc từ server
      const comicRes = await fetch(`http://192.168.1.44:5000/index/${comicId}`);
      const comicData = await comicRes.json();

      if (!comicRes.ok) throw new Error('Không lấy được truyện');

      const chapters = [...comicData.chapters];
      chapters[chapterIndex] = updatedChapter;

      const response = await fetch(`http://192.168.1.44:5000/index/${comicId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...comicData, chapters }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(result);
        Alert.alert('Lỗi', result.message || 'Không thể cập nhật chương');
        return;
      }

      Alert.alert('Thành công', 'Chương đã được cập nhật');
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi khi cập nhật chương:', error);
      Alert.alert('Lỗi', error.message || 'Không thể kết nối');
    }
  };

 const handleDelete = async () => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xoá chương này?', [
      { text: 'Hủy' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await fetch(
              `http://192.168.1.44:5000/index/${comicId}/chapter/${chapterIndex}`,
              {
                method: 'DELETE',
              }
            );
            const result = await response.json();

            if (!response.ok) throw new Error('Xoá chương thất bại');

            Alert.alert('Thành công', 'Đã xoá chương');
            navigation.goBack();  // Quay lại trang trước
          } catch (error) {
            console.error('Lỗi khi xoá chương:', error);
            Alert.alert('Lỗi', error.message || 'Không thể xoá chương');
          }
        },
      },
    ]);
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
        <Button title="Lưu chương" onPress={handleSave} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button title="Xoá chương" color="red" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
});
