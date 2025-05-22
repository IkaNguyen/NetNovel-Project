import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'http://192.168.1.44:5000';
const defaultImage = 'https://i.pinimg.com/736x/d8/6e/79/d86e79e1289410f65e5f5bb8840dd4b7.jpg';

export default function Search() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [latestStories, setLatestStories] = useState([]);

  useEffect(() => {
    const fetchLatestStories = async () => {
      try {
        const response = await fetch(`${API_URL}/index`);
        if (!response.ok) throw new Error('Failed to fetch stories');
        const allStories = await response.json();
        const last10Stories = allStories.slice(-10);
        setLatestStories(last10Stories);
      } catch (error) {
        console.error('Lỗi khi tải truyện:', error.message);
      }
    };

    fetchLatestStories();
  }, []);

  const handleSearch = async (text) => {
    setQuery(text);

    if (text.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/index`);
      if (!response.ok) throw new Error('Failed to fetch for search');

      const allStories = await response.json();
      const filtered = allStories.filter(story =>
        story.title.toLowerCase().includes(text.toLowerCase())
      );

      setSearchResults(filtered);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error.message);
    }
  };

  const renderSearchResultItem = ({ item }) => (
    <TouchableOpacity
      style={styles.searchResultItem}
      onPress={() => navigation.navigate('Truyen', { story: item })}
    >
      <Image
        source={{ uri: item.coverImage || defaultImage }}
        style={styles.searchResultImage}
      />
      <Text style={styles.searchResultTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderSuggestedItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestedItem}
      onPress={() => navigation.navigate('Truyen', { story: item })}
    >
      <Image
        source={{ uri: item.coverImage || defaultImage }}
        style={styles.suggestedImage}
      />
      <Text style={styles.suggestedTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm truyện..."
          value={query}
          onChangeText={handleSearch}
          placeholderTextColor="#aaa"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {query.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>
            {searchResults.length > 0 ? 'Kết quả tìm kiếm' : 'Không tìm thấy kết quả'}
          </Text>
          <FlatList
            data={searchResults}
            renderItem={renderSearchResultItem}
            keyExtractor={item => item._id}
            style={styles.searchResultsList}
          />
        </>
      )}

      {latestStories.length > 0 && query.length === 0 && (
        <>
          <Text style={styles.sectionTitle}>Gợi Ý 10 Truyện Mới</Text>
          <FlatList
            data={latestStories}
            renderItem={renderSuggestedItem}
            keyExtractor={item => item._id}
            numColumns={3}
            contentContainerStyle={styles.flatListContainer}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 42,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  searchResultsList: {
    marginTop: 10,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  searchResultImage: {
    width: 60,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
  },
  searchResultTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  suggestedItem: {
    width: '30%',
    marginHorizontal: '1.66%',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 2,
   // shadowColor: '#000',
   // shadowOpacity: 0.08,
  //  shadowOffset: { width: 0, height: 2 },
   // shadowRadius: 4,
    elevation: 2,
  },
  suggestedImage: {
    width: 100,
    height: 130,
    borderRadius: 5,
    marginBottom: 8,
  },
  suggestedTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
});
