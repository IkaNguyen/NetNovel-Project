import React, { useEffect, useState } from 'react';
import {
  View, ScrollView, StyleSheet, Image, Text,
  TouchableOpacity, Modal, FlatList
} from 'react-native';

export default function ChapterScreen({ route, navigation }) {
  const { chapter, chapters } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);

  if (!Array.isArray(chapters)) {
    console.error('Chapters is not a valid array');
    return <Text>Chapters are not available</Text>;
  }

  if (!chapter) {
    console.error('Chapter not found');
    return <Text>Chapter not found</Text>;
  }

  const currentIndex = chapters.findIndex(
    ch => ch.chapter_number === chapter.chapter_number
  );

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigation.replace('ChapterScreen', {
        chapter: chapters[currentIndex - 1],
        chapters,
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < chapters.length - 1) {
      navigation.replace('ChapterScreen', {
        chapter: chapters[currentIndex + 1],
        chapters,
      });
    }
  };

  const handleSelectChapter = (selectedChapter) => {
    setModalVisible(false);
    navigation.replace('ChapterScreen', {
      chapter: selectedChapter,
      chapters,
    });
  };

  // Gắn tiêu đề giống Truyen.js
  useEffect(() => {
    navigation.setOptions({
      title: chapter.title || 'Chương',
    });
  }, [chapter]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
       
        {chapter.pages && chapter.pages.map((page, index) => (
          <Image
            key={index}
            source={{ uri: page }}
            style={styles.pageImage}
            resizeMode="contain"
          />
        ))}
      </ScrollView>

      {/* Điều hướng chương */}
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={handlePrevious}
          disabled={currentIndex === 0}
          style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
        >
          <Text style={styles.navButtonText}>{'<'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chapterPicker}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.chapterPickerText}>
            Chương {chapter.chapter_number}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={currentIndex === chapters.length - 1}
          style={[styles.navButton, currentIndex === chapters.length - 1 && styles.disabledButton]}
        >
          <Text style={styles.navButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal chọn chương */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn chương</Text>
            <FlatList
              data={chapters}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelectChapter(item)}
                >
                  <Text style={styles.modalItemText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingBottom: 45,
  },
  scrollContainer: {
    padding: 1,
    paddingBottom: 30,
  },
 
  pageImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 0.75,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 2,
    left: 16,
    right: 16,
    
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: '#3D8361',
    paddingVertical: 5,
    paddingHorizontal: 32,
    borderRadius: 2,
    alignItems: 'center',
    
  },
  navButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
  chapterPicker: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 56,
    paddingVertical: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 8,
  },
  chapterPickerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    maxHeight: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalClose: {
    alignSelf: 'center',
    marginTop: 16,
    padding: 10,
  },
  modalCloseText: {
    fontSize: 16,
    color: '#007BFF',
  },
});
