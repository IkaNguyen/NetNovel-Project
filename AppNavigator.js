import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Button, Image, FlatList, ScrollView, KeyboardAvoidingView, Platform, ImageBackground, TextInput, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FoodList from './FoodList';
import HisList from './HisList';
// Tạo Drawer Navigator
const Drawer = createDrawerNavigator();

// Màn hình đăng nhập
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async () => {
        setIsLoggingIn(true);
        setTimeout(async () => {
            if (email === 'quynh.com' && password === '12345') {
                const token = 'your_jwt_token_here';
                try {
                    await AsyncStorage.setItem('jwt_token', token); // Lưu JWT vào AsyncStorage
                    Alert.alert('Login successful', 'You have successfully logged in!');
                    setIsLoggingIn(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                } catch (error) {
                    console.error('Failed to save token:', error);
                }
            } else {
                Alert.alert('Login Failed', 'Invalid email or password');
                setIsLoggingIn(false);
            }
        }, 2000);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        ><View style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {isLoggingIn ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Image
                source={{ uri: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1597821998048-538UNQI253SYL3KE9NGD/chup-anh-mon-an-breakfast-10.jpg' }}
                style={styles.image}
            />
        </KeyboardAvoidingView>
    );
};

// Màn hình Home
const HomeScreen = ({ navigation }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('jwt_token');
                setToken(storedToken);
            } catch (error) {
                console.error('Failed to fetch token:', error);
            }
        };
        fetchToken();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('jwt_token');
            Alert.alert('Logout Successful', 'You have logged out!');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Failed to remove token:', error);
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474081JPp/background-powerpoint-xanh-duong-sang_094944576.jpg' }}
            style={styles.backgroundImage} // Chèn ảnh làm background
        >
            <ScrollView style={styles.containerr}>
                <Text style={styles.titlee}>Home </Text>
                {token ? (
                    <>

                        <Image
                            source={{ uri: 'https://file.hstatic.net/1000394081/article/top-20-loai-tra-sua_04a9f01fbe914b699c149c714eeaaeab.jpg' }} // Thay bằng URL hình ảnh trà sữa
                            style={styles.imagee}
                        />
                        <Text style={styles.heading}>Trà Sữa – Một Hương Vị Ngon Mê Mẩn</Text>
                        <Text style={styles.description}>
                            Trà sữa là một thức uống nổi tiếng đến từ Đài Loan, đã và đang chinh phục trái tim của hàng triệu tín đồ yêu thích đồ uống trên khắp thế giới. Sự kết hợp hoàn hảo giữa trà thơm ngon, sữa tươi ngọt ngào cùng các loại topping như trân châu, thạch, hay pudding tạo nên một trải nghiệm tuyệt vời. Với hương vị đa dạng từ trà đen, trà xanh, trà ô long, đến các món đặc biệt như trà sữa matcha hay trà sữa thái, trà sữa không chỉ đơn giản là thức uống mà còn là một phần trong văn hóa ẩm thực đường phố.
                        </Text>
                        <Image
                            source={{ uri: 'https://cdn.tgdd.vn/2021/06/CookProduct/1(1)-1200x676-1.jpg' }} // Thay bằng URL hình ảnh trà sữa
                            style={styles.imagee}
                        />
                        <Text style={styles.heading}>Món Ăn Dân Dã – Hương Vị Quê Hương Đậm Đà</Text>
                        <Text style={styles.description}>
                            Món ăn dân dã Việt Nam luôn mang trong mình những hương vị đơn giản nhưng đậm đà, thể hiện nét đẹp trong văn hóa ẩm thực của từng vùng miền. Những món ăn này không chỉ ngon miệng mà còn gắn liền với những kỷ niệm tuổi thơ, là nguồn cảm hứng cho nhiều người muốn tìm lại hương vị quê hương.
                            Có thể kể đến những món ăn đặc trưng như phở, bánh xèo, bánh cuốn, cơm tấm, hay bánh mì – những món ăn gắn liền với cuộc sống hàng ngày của người dân Việt Nam. Chúng thường được chế biến từ những nguyên liệu đơn giản nhưng lại mang đến sự hài hòa tuyệt vời giữa vị mặn, ngọt, cay, chua.
                        </Text>
                        <Image
                            source={{ uri: 'https://cdn.24h.com.vn/upload/1-2025/images/2025-03-09/1741454709-com-1-76767-width640height446.jpg' }} // Thay bằng URL hình ảnh trà sữa
                            style={styles.imagee}
                        />
                        <Text style={styles.heading}>Bữa Cơm Gia Đình – Nơi Gắn Kết Yêu Thương</Text>
                        <Text style={styles.description}>
                            Bữa cơm gia đình không chỉ là một bữa ăn mà là dịp để các thành viên quây quần bên nhau, chia sẻ những câu chuyện, niềm vui và khó khăn trong cuộc sống. Mâm cơm đơn giản nhưng đầy ắp tình yêu thương, được chuẩn bị từ những món ăn quen thuộc như canh chua, thịt kho hột vịt, rau luộc hay cá chiên giòn. Dù chỉ là những món ăn bình dị, nhưng mỗi món ăn trong bữa cơm đều mang trong đó sự chăm sóc và sự quan tâm của người nấu.
                        </Text>
                        <Text>JWT Token: {token}</Text>

                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>


                    </>
                ) : (
                    <Text>Bạn chưa đăng nhập, vui lòng đăng nhập</Text>
                )}
            </ScrollView>
        </ImageBackground>
    );
};

// Màn hình yêu thích
const FavoritesScreen = () => {
    return ( // Thêm return
        <View style={styles.screen}>

            <Image
                source={{ uri: 'https://zshop.vn/blogs/wp-content/uploads/2022/07/fptip-1.jpg' }}
                style={styles.headerImage}
            />
            <Text style={styles.title}>Favorites Food</Text>
            <FoodList />
        </View>
    );
};

// Màn hình lịch sử
const HistoryScreen = () => {
    return ( // Thêm return
        <View style={styles.screenn}>
            <Image
                source={{ uri: 'https://zshop.vn/blogs/wp-content/uploads/2022/07/fptip-1.jpg' }}
                style={styles.headerImage}
            />
            <Text style={styles.title}>Favorites Drink</Text>
            <HisList />
        </View>

    );
};

// Tùy chọn biểu tượng cho Drawer
const screenOptions = (iconName) => ({
    drawerIcon: ({ color }) => <Icon name={iconName} size={22} color={color} />,

    drawerLabelStyle: {
        color: '#FFA500', // Màu chữ cho label
        fontSize: 16, // Kích thước chữ cho label
        fontWeight: 'bold', // Chữ đậm
    },
});

// Main App Navigator
const AppNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Login"
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#282c34',
                },
                drawerInactiveTintColor: '#ffffff',
                drawerActiveTintColor: '#282c34',
                headerStyle: {
                    backgroundColor: '#282c34',
                },
                headerTintColor: '#ffffff',
            }}
        >
            <Drawer.Screen
                name="Login"
                component={LoginScreen}
                options={screenOptions('log-in')}
            />
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={screenOptions('home-outline')}
            />
            <Drawer.Screen
                name="Favorites Food"
                component={FavoritesScreen}
                options={screenOptions('heart-outline')}
            />
            <Drawer.Screen
                name="Favorites Drink"
                component={HistoryScreen}
                options={screenOptions('heart-outline')}
            />
        </Drawer.Navigator>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9ecef', // Màu nền nhẹ
        padding: 5,
    },
    headerImage: {
        width: '100%',  // Đảm bảo ảnh chiếm toàn bộ chiều rộng
        height: 70,    // Chiều cao ảnh tùy chỉnh
        borderRadius: 10,  // Bo tròn góc ảnh
        marginBottom: 2,  // Khoảng cách giữa ảnh và các phần tử dưới
    },

    formContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff', // Màu nền cho container
        borderRadius: 12, // Bo góc
        shadowColor: '#000', // Đổ bóng
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6, // Đổ bóng cho Android
        margin: 10,
    },
    title: {
        fontSize: 30, // Kích thước chữ lớn hơn
        fontWeight: 'bold',
        color: '#282c34', // Màu chữ tối
        marginBottom: 2, // Khoảng cách giữa tiêu đề và các thành phần khác
        textAlign: 'center', // Căn giữa
    },
    titlee: {
        fontSize: 30, // Kích thước chữ lớn hơn
        fontWeight: 'bold',
        color: '#282c34', // Màu chữ tối
        marginBottom: 2, // Khoảng cách giữa tiêu đề và các thành phần khác
        textAlign: 'center',
    }, // Căn giữa
    input: {
        width: '100%',
        height: 50, // Tăng chiều cao
        borderColor: '#007bff', // Màu viền
        borderWidth: 1,
        borderRadius: 30, // Bo góc cho input
        paddingLeft: 30, // Khoảng cách bên trái
        marginTop: 10,
        backgroundColor: '#f7f9fc', // Màu nền cho input
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#282c34', // Màu nền cho nút đăng xuất
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 1,
        padding: 10,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    logoutText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center', // Căn giữa chữ
    },
    button: {
        backgroundColor: '#282c34', // Màu nền cho nút đăng nhập
        paddingVertical: 8, // Khoảng cách dọc trong nút
        paddingHorizontal: 8, // Khoảng cách ngang trong nút
        borderRadius: 25, // Bo góc tròn cho nút (lớn hơn để trông mềm mại)
        width: '40%', // Chiều rộng 100%
        marginTop: 20, // Khoảng cách trên nút
        borderWidth: 1, // Đường viền cho nút
        borderColor: '#0056b3', // Màu viền của nút
        elevation: 5, // Đổ bóng nhẹ cho nút Android
        shadowColor: '#0056b3', // Đổ bóng cho iOS
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        alignItems: 'center', // Căn giữa chữ trong nút
        justifyContent: 'center', // Căn giữa chữ trong nút
        transition: 'all 0.3s ease', // Hiệu ứng chuyển đổi khi nhấn vào nút
    },
    buttonText: {
        color: '#ffffff', // Màu chữ trên nút
        fontWeight: 'bold', // Chữ đậm
        textAlign: 'center', // Căn giữa chữ trong nút
        fontSize: 18, // Kích thước chữ
    },
    buttonPressed: {
        backgroundColor: '#0056b3', // Màu nền khi nút được nhấn
        elevation: 8, // Tăng độ nổi khi nhấn
        shadowOpacity: 0.25, // Đổ bóng đậm hơn khi nhấn
    },
    image: {
        width: '100%', // Ảnh sẽ chiếm toàn bộ chiều rộng màn hình
        height: 200,  // Chiều cao của ảnh
        marginTop: 20,  // Khoảng cách từ nút login đến ảnh
        borderRadius: 10, // Bo tròn góc ảnh
    },
    imagee: {
        width: 360, // Chiều rộng của hình ảnh
        height: 250, // Chiều cao của hình ảnh
        marginTop: 2,
        marginBottom: 2,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
        marginBottom: 15,
    },
    tokenText: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        marginBottom: 20,
    },
});
export default AppNavigator;