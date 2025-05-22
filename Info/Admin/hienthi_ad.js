import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

export default function ComicDetail({ route, navigation }) {
  const { comic } = route.params;
  const [chapters, setChapters] = useState(comic.chapters);

  const fetchChapters = async () => {
    try {
      const response = await fetch(`http://192.168.1.44:5000/index/${comic._id}`);
      const data = await response.json();
      setChapters(data.chapters); // Cập nhật danh sách chương
    } catch (error) {
      console.error('Lỗi lấy dữ liệu chương:', error);
    }
  };

  const handleEditChapter = (chapter, index) => {
    navigation.navigate('Chuong', {
      comicId: comic._id,
      chapterIndex: index,
      chapter,
    });
  };

  const handleDeleteChapter = (index) => {
    Alert.alert(
      'Xoá chương',
      'Bạn có chắc muốn xoá chương này?',
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`http://192.168.1.44:5000/index/${comic._id}/chapter/${index}`, {
                method: 'DELETE',
              });
              const result = await response.json();
              if (!response.ok) {
                return Alert.alert('Lỗi', result.message || 'Không xoá được chương');
              }

              Alert.alert('Thành công', 'Đã xoá chương');
              fetchChapters(); // Cập nhật lại danh sách chương
            } catch (error) {
              Alert.alert('Lỗi', 'Không kết nối được máy chủ');
              console.error('Lỗi xoá chương:', error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchChapters();

    // Thiết lập các tùy chọn cho navigation để có thể gọi lại fetchChapters sau khi cập nhật
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Chỉnh sửa"
          onPress={() => navigation.navigate('update', { comic })}
        />
      ),
    });
  }, [comic._id]);

  // Sử dụng useFocusEffect để tự động tải lại dữ liệu khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      fetchChapters(); // Tải lại dữ liệu khi màn hình được focus
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: comic.coverImage }} style={styles.cover} />
      <Text style={styles.title}>{comic.title}</Text>
      <Text style={styles.meta}>Tác giả: {comic.author}</Text>
      <Text style={styles.meta}>Thể loại: {comic.genres.join(', ')}</Text>
      <Text style={styles.description}>{comic.description}</Text>

      <Text style={styles.chapterHeader}>Danh sách chương:</Text>
      {chapters && chapters.length > 0 ? (
        chapters.map((chap, index) => (
          <View key={index} style={styles.chapterItem}>
            <View style={styles.chapterRow}>
              <Text style={{ flex: 1 }}>
                {`Chương ${chap.chapter_number}: ${chap.title}`}
              </Text>

              <TouchableOpacity onPress={() => handleEditChapter(chap, index)} style={styles.icon}>
                <MaterialIcons name="edit" size={20} color="#007bff" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDeleteChapter(index)} style={styles.icon}>
                <MaterialIcons name="delete" size={20} color="#dc3545" />
              </TouchableOpacity>
            </View>
            <Text style={styles.chapterDate}>
              {new Date(chap.release_date).toLocaleDateString()}
            </Text>
          </View>
        ))
      ) : (
        <Text>Chưa có chương nào</Text>
      )}
      <View style={{ marginTop: 20 }}>
  <Button
    title="➕ Thêm chương mới"
    onPress={() => navigation.navigate('ThemChuong', { comicId: comic._id })}
  />
</View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  cover: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  meta: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 20,
  },
  chapterHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  chapterItem: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  chapterDate: {
    fontSize: 12,
    color: 'gray',
    marginTop: 3,
  },
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
});
