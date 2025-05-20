import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'http://192.168.1.78:5000';
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

  // Kết quả tìm kiếm: bìa bên trái, tên bên phải
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

  // Gợi ý 10 truyện: 3 cột, bìa trên, tên dưới
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
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color="gray" />
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
          <Text style={styles.sectionTitle}>Gợi Ý 10 Truyện Cuối</Text>
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
  container: { flex: 1, padding: 10, backgroundColor: '#f9f9f9' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  clearButton: { marginLeft: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },

  // ========== Kết quả tìm kiếm ==========
  searchResultsList: {
    marginTop: 10,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  searchResultImage: {
    width: 60,
    height: 80,
    marginRight: 15,
    borderRadius: 5,
  },
  searchResultTitle: {
    fontSize: 14,
    flex: 1,
    textAlign: 'left',
  },

  // ========== Gợi ý truyện (3 cột) ==========
  flatListContainer: {
    paddingBottom: 10,
  },
  suggestedItem: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    width: '30%',
    marginBottom: 20,
  },
  suggestedImage: {
    width: 100,
    height: 130,
    marginBottom: 8,
    borderRadius: 5,
  },
  suggestedTitle: {
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
  },
});
