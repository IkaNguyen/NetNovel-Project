import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { UserContext } from '../UserContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const defaultImage = 'https://i.pinimg.com/736x/d8/6e/79/d86e79e1289410f65e5f5bb8840dd4b7.jpg';

export default function Search() {
  const { allStories } = useContext(UserContext);
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [newestStories, setNewestStories] = useState([]);

  // Ensure that allStories is not undefined or null before filtering
  const filteredStories = query && allStories
    ? allStories.filter(story =>
        story.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Lọc các truyện mới đăng trong vòng 7 ngày qua
  useEffect(() => {
    if (allStories) {
      const latestStories = allStories
        .filter(story => {
          const currentDate = new Date();
          const storyDate = new Date(story.createdAt);
          const timeDiff = currentDate - storyDate;
          const daysDiff = timeDiff / (1000 * 3600 * 24);
          return daysDiff <= 7;
        })
        .slice(0, 5);
        
      setNewestStories(latestStories);
    }
  }, [allStories]);

  // Hàm render tên truyện trong kết quả tìm kiếm
  const renderSearchResult = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.searchItem}
        onPress={() => navigation.navigate('Truyen', { story: item })}
      >
        <Text style={styles.storyTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  // Hàm render truyện trong gợi ý mới đăng
  const renderNewestStory = ({ item }) => {
    const imageSource = item.image ? { uri: item.image } : { uri: defaultImage };
    return (
      <TouchableOpacity
        style={styles.storyItem}
        onPress={() => navigation.navigate('Truyen', { story: item })}
      >
        <Image source={imageSource} style={styles.storyImage} />
        <Text style={styles.storyTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const handleClearSearch = () => {
    setQuery('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm truyện..."
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      {query.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>
            {filteredStories.length > 0 ? 'Kết quả tìm kiếm' : 'Không tìm thấy kết quả'}
          </Text>
          <FlatList
            data={filteredStories}
            renderItem={renderSearchResult}
            keyExtractor={item => `${item.id}`}
          />
        </>
      )}

      {newestStories.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Gợi Ý Truyện Mới Đăng</Text>
          <FlatList
            data={newestStories}
            renderItem={renderNewestStory}
            keyExtractor={item => `${item.id}`}
            horizontal={true}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10,
    backgroundColor: '#f9f9f9' 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
    backgroundColor: '#fff',
  },
  clearButton: {
    marginLeft: 10,
    padding: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  searchItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  storyItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  storyImage: {
    width: 100,
    height: 140,
    borderRadius: 8,
    marginRight: 10,
  },
  storyTitle: {
    fontSize: 18,
    flex: 1,
  },
});
