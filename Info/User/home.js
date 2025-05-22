import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveAllStories } from '../storage'; // Đảm bảo import hàm saveAllStories
import { UserContext } from '../UserContext';
import { FontAwesome5 } from '@expo/vector-icons';

const DEFAULT_IMAGE = 'https://i.pinimg.com/736x/e0/2c/be/e02cbe2ac89d57920544a21d43fb1b34.jpg';

export default function Home() {
    const [stories, setStories] = useState([]); // Truyện mới
    const [trending, setTrending] = useState([]); // Top Trending
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

    const renderNewStoryy = (item) => {
        if (!item || !item._id || !item.title || !item.author) {
            console.error('Invalid story item:', item);
            return null;
        }

        const imageUri = item.coverImage || DEFAULT_IMAGE;
        const lastChapter = item.chapters?.[item.chapters.length - 1];

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Truyen', { story: item })}
                style={styles.newStoryItem}
                key={item._id.toString()}
            >
                <Image source={{ uri: imageUri }} style={styles.newStoryImage} />
                <View style={styles.newStoryTextContainer}>
                    <Text style={styles.newStoryTitle} numberOfLines={2}>{item.title}</Text>
                    <View style={styles.newStoryAuthorRow}>
                        <FontAwesome5 name="user" size={14} color="gray" style={{ marginRight: 0 }} />
                        <Text style={styles.newStoryAuthor}>Tác giả: {item.author}</Text>
                    </View>

                    {lastChapter ? (
                        <Text style={styles.chapterInfo}>
                             Chương {lastChapter.chapter_number}: {lastChapter.title}
                        </Text>
                    ) : (
                        <Text style={styles.chapterInfo}>Chưa có chương mới</Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

   useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://192.168.1.44:5000/index');
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

                // 1. Top Trending: Lấy ngẫu nhiên 5 truyện từ danh sách
                const shuffled = [...data].sort(() => 0.5 - Math.random());
                const randomTrending = shuffled.slice(0, 5); // Chọn 5 truyện ngẫu nhiên

                // 2. Truyện mới: Sắp xếp theo thời gian (createdAt hoặc updatedAt)
                const sortedStories = [...data].sort((a, b) => {
                    // Lấy ngày createdAt hoặc updatedAt, ưu tiên trường createdAt trước
                    const dateA = a.createdAt || a.updatedAt;
                    const dateB = b.createdAt || b.updatedAt;
                    
                    // Nếu một trong hai trường là null, sẽ sử dụng giá trị còn lại.
                    const releaseA = dateA ? new Date(dateA) : new Date(0); // Nếu không có giá trị, dùng mốc thời gian từ rất lâu
                    const releaseB = dateB ? new Date(dateB) : new Date(0);

                    return releaseB - releaseA; // Sắp xếp theo thứ tự từ mới đến cũ
                });

                setTrending(randomTrending); // Cập nhật Top Trending
                setStories(sortedStories); // Cập nhật Truyện mới
                saveAllStories(sortedStories); // Lưu dữ liệu truyện vào AsyncStorage
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
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.sectionTitle}>Top Trending</Text>
                            <FlatList
                                horizontal
                                data={trending}
                                renderItem={({ item }) => renderStory(item)}
                                keyExtractor={(item) => item._id.toString()}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                            />
                        </View>
                    );
                }
                if (item.type === 'newStories') {
                    return (
                        <View style={{ marginTop: -20 }}>
                            <Text style={styles.sectionTitle}>Truyện mới</Text>
                            <FlatList
                                data={stories}
                                renderItem={({ item }) => renderNewStoryy(item)}
                                keyExtractor={(item) => item._id.toString()}
                                contentContainerStyle={styles.newStoriesContainer}
                            />
                        </View>
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
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFFFFF',
        marginTop: 50,
    },
    header: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileText: { color: 'blue' },
    sectionTitle: {
        fontSize: 20,
        margin: 10,
    },
    storyItem: {
        marginRight: 10,
        alignItems: 'center',
        width: 100,
    },
    storyImage: {
        width: 95,
        height: 120,
        borderRadius: 8,
    },
    storyTitle: {
        textAlign: 'center',
        marginTop: 5,
    },
    storyAuthor: {
        textAlign: 'center',
        fontSize: 12,
        color: 'gray',
    },
    newStories: {
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
    viewAllButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    viewAllText: {
        fontSize: 16,
        color: 'blue',
    },

    newStories: {
        paddingRight: 10,
    },

    newStoryItem: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 5,
        elevation: 2, // shadow cho android
        shadowColor: '#000', // shadow cho ios
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        marginRight: 10,
        marginLeft: 10,
    },
    chapterInfo: {
        fontSize: 13,
        color: '#333',
        marginTop: 4,
        fontWeight: '300',
        marginLeft: 5,
    },

    newStoryImage: {
        width: 80,
        height: 100,
        borderRadius: 3,
        padding: 1,
    },

    newStoryTextContainer: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#333',
        marginHorizontal: 15,
        marginBottom: 10,
    },
    newStoryAuthorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 2,
    },

    newStoryAuthor: {
        fontSize: 14,
        color: 'gray',
        padding: 10,
    },
});
