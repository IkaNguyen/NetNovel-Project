import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';
import { UserContext } from './UserContext';
import { useNavigation } from '@react-navigation/native';
import { getAllStories } from './storage';

const DEFAULT_IMAGE = 'https://i.pinimg.com/736x/d8/6e/79/d86e79e1289410f65e5f5bb8840dd4b7.jpg'; // Đường dẫn đến ảnh bìa mặc định
const trending = [...Array(5)].map((_, i) => ({
    id: `${i}`,
    title: `Trending ${i + 1}`,
    image: `https://nld.mediacdn.vn/2020/5/29/photo-10-15907421461051559208459.jpg`
}));

export default function Home() {
    const { user, setAllStories, allStories } = useContext(UserContext);
    const [stories, setStories] = useState([]);
    const navigation = useNavigation();

    const renderStory = (item) => {
        const imageSource = item.image ? item.image : DEFAULT_IMAGE; // Kiểm tra ảnh bìa
        return (
            <TouchableOpacity 
                onPress={() => navigation.navigate('Truyen', { story: item })} // Truyền toàn bộ thông tin của quyển truyện
                style={styles.storyItem} 
                key={item.id}
            >
                <Image source={{ uri: imageSource }} style={styles.storyImage} />
                <Text style={styles.storyTitle}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllStories();
            setStories(data);
            setAllStories(data);
        };

        fetchData();
    }, [allStories]);

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('Profile')}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text style={styles.profileText}>Trang cá nhân →</Text>
                </View>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Top Trending</Text>
            <FlatList
                horizontal
                data={trending}
                renderItem={({ item }) => renderStory(item)}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />

            <Text style={styles.sectionTitle}>Truyện mới</Text>
            <FlatList
                data={stories}
                renderItem={({ item }) => renderStory(item)} // Sử dụng hàm renderStory
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.newStories}
            />
            <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate('List')}>
                <Text style={styles.viewAllText}>Xem danh sách truyện đã lưu</Text>
            </TouchableOpacity>
        </ScrollView>
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
    newStories: { flexDirection: 'column', paddingHorizontal: 10 },
    viewAllButton: { marginTop: 20, alignItems: 'center' },
    viewAllText: { fontSize: 16, color: 'blue' },
});