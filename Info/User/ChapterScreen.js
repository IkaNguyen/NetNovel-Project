import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

export default function ChapterScreen({ route, navigation }) {
  const { chapter, chapters } = route.params;

  // Kiểm tra chapters có phải là mảng không
  if (!Array.isArray(chapters)) {
    console.error('Chapters is not a valid array');
    return <Text>Chapters are not available</Text>;
  }

  // Kiểm tra nếu chapter không hợp lệ
  if (!chapter) {
    console.error('Chapter not found');
    return <Text>Chapter not found</Text>;
  }

  // Tìm chỉ số chương hiện tại trong chapters
  const currentIndex = chapters.findIndex(
    ch => ch.chapter_number === chapter.chapter_number
  );

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigation.navigate('ChapterScreen', {
        chapter: chapters[currentIndex - 1],
        chapters,
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < chapters.length - 1) {
      navigation.navigate('ChapterScreen', {
        chapter: chapters[currentIndex + 1],
        chapters,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Nút Quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Quay lại màn hình trước
      >
        <Text style={styles.backButtonText}>{'← Quay lại'}</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{chapter.title}</Text>
        {chapter.pages && chapter.pages.map((page, index) => (
          <Image
            key={index}
            source={{ uri: page }}
            style={styles.pageImage}
            resizeMode="contain"
          />
        ))}
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={handlePrevious}
          disabled={currentIndex === 0}
          style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
        >
          <Text style={styles.navButtonText}>{'<'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={currentIndex === chapters.length - 1}
          style={[styles.navButton, currentIndex === chapters.length - 1 && styles.disabledButton]}
        >
          <Text style={styles.navButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60, // chừa chỗ cho nút điều hướng
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 16,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    zIndex: 1, // Đảm bảo nút luôn hiển thị trên các phần khác
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pageImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 0.75,
    marginBottom: 10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    left: 16,
    right: 16,
  },
  navButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: 50,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
