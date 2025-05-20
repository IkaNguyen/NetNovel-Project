import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveAllStories } from '../storage'; // Đảm bảo import hàm saveAllStories
import { UserContext } from '../UserContext';

const DEFAULT_IMAGE = 'https://i.pinimg.com/736x/e0/2c/be/e02cbe2ac89d57920544a21d43fb1b34.jpg';

export default function Home() {
    const [stories, setStories] = useState([]);
    const [trending, setTrending] = useState([]);
    const [dataFetched, setDataFetched] = useState(false); // State để theo dõi dữ liệu đã fetch
    const navigation = useNavigation();
    const { user } = useContext(UserContext);

    const renderStory = (item) => {
        if (!item || !item._id || !item.title || !item.author) {
            console.error('Invalid story item:', item);
            return null;
        }
        const imageUri = item.coverImage || DEFAULT_IMAGE;
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Truyen', { story: item })}
                style={styles.storyItem}
                key={item._id.toString()}
            >
                <Image source={{ uri: imageUri }} style={styles.storyImage} />
                <Text style={styles.storyTitle}>{item.title}</Text>
                <Text style={styles.storyAuthor}>Tác giả: {item.author}</Text>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.1.78:5000/index');
                if (!response.ok) {
                    console.error('Error fetching data:', response.statusText);
                    return;
                }
                const data = await response.json();

                if (Array.isArray(data)) {
                    if (!dataFetched) {
                        console.log('Fetched data:', data);
                        setDataFetched(true);
                    }
                    setStories(data);
                    saveAllStories(data); // Lưu dữ liệu truyện vào AsyncStorage
                    setTrending(data.slice(0, 5));
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dataFetched]);

    return (
        <FlatList
            data={[{ type: 'header' }, { type: 'trending' }, { type: 'newStories' }, { type: 'viewAllButton' }]}
            renderItem={({ item }) => {
                if (item.type === 'header') {
                    return (
                        <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('Profile')}>
                            <Image
                                source={{
                                    uri: user.avatar || DEFAULT_IMAGE,
                                }}
                                style={styles.avatar}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.username}>{user.name}</Text>
                                <Text style={styles.profileText}>Trang cá nhân →</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }
                if (item.type === 'trending') {
                    return (
                        <>
                            <Text style={styles.sectionTitle}>Top Trending</Text>
                            <FlatList
                                horizontal
                                data={trending}
                                renderItem={({ item }) => renderStory(item)}
                                keyExtractor={(item) => item._id.toString()}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                            />
                        </>
                    );
                }
                if (item.type === 'newStories') {
                    return (
                        <>
                            <Text style={styles.sectionTitle}>Truyện mới</Text>
                            <FlatList
                                data={stories}
                                renderItem={({ item }) => renderStory(item)}
                                keyExtractor={(item) => item._id.toString()}
                                numColumns={2}
                                contentContainerStyle={styles.newStories}
                            />
                        </>
                    );
                }
                if (item.type === 'viewAllButton') {
                    return (
                        <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate('List')}>
                            <Text style={styles.viewAllText}>Xem danh sách truyện đã lưu</Text>
                        </TouchableOpacity>
                    );
                }
                return null;
            }}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => <View style={{ height: 10 }} />}
        />
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', padding: 10, alignItems: 'center' },
    avatar: { width: 60, height: 60, borderRadius: 30 },
    username: { fontSize: 18, fontWeight: 'bold' },
    profileText: { color: 'blue' },
    sectionTitle: { fontSize: 20, margin: 10 },
    storyItem: { marginRight: 10, alignItems: 'center', width: 100 },
    storyImage: { width: 100, height: 140, borderRadius: 8 },
    storyTitle: { textAlign: 'center', marginTop: 5 },
    storyAuthor: { textAlign: 'center', fontSize: 12, color: 'gray' },
    newStories: { flexDirection: 'column', paddingHorizontal: 10 },
    viewAllButton: { marginTop: 20, alignItems: 'center' },
    viewAllText: { fontSize: 16, color: 'blue' },
});
