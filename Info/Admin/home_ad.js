import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect from react-navigation

export default function Home_Ad({ navigation }) {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComics = async () => {
    try {
      const response = await fetch('http://192.168.1.44:5000/index');
      const data = await response.json();
      setComics(data); // Update the state with the fetched data
    } catch (error) {
      console.error('Error fetching comics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch comics when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchComics(); // Fetch data when the screen is focused
    }, [])
  );

  const renderItem = ({ item }) => {
    const lastChapter = item.chapters && item.chapters.length > 0
      ? item.chapters[item.chapters.length - 1]
      : null;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ComicDetail', { comic: item })}
      >
        <Image source={{ uri: item.coverImage }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>Tác giả: {item.author}</Text>
          <Text style={styles.chapter}>
            {lastChapter ? `Chương mới nhất: ${lastChapter.title}` : 'Chưa có chương'}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.detailButton}
            onPress={() => navigation.navigate('ComicDetail', { comic: item })}
          >
            <Text style={{ color: 'white' }}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={comics}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    padding: 10,
  },
  image: {
    width: 80,
    height: 110,
    borderRadius: 8,
  },
  info: {
    marginLeft: 10,
    justifyContent: 'space-around',
    flex: 1,
  },
  actions: {
    marginTop: 10,
  },
  detailButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chapter: {
    color: 'gray',
  },
  author: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
