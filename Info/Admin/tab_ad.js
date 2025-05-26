import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import ComicDetail from './hienthi_ad';
import DangXuat from './logout';
import Chuong from './chuong_ad';
import Update from './update_ad';
import ThemChuong from './them_ad';
import Home_Ad from './home_ad';
import Profile_ad from './pro_ad';
import ThemTruyen from './addtruyen';

// Tạo Drawer Navigator
const Drawer = createDrawerNavigator();
function Tab() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeAd"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#3D8361',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#fff',
        },
        // Style cho Drawer Navigator
        drawerStyle: {
          backgroundColor: '#f0f0f0',
          width: 240,
        },
        drawerActiveBackgroundColor: '#3D8361',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#555',
        drawerLabelStyle: {
          marginLeft: -10,
          fontSize: 16,
        },
        // Thêm icon cho từng mục menu
        drawerIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === 'HomeAd') {
            iconName = 'home-outline';
          } else if (route.name === 'Add') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'ProAd') {
            iconName = 'person-outline';
          } else if (route.name === 'xuat') {
            iconName = 'log-out-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Drawer.Screen name="HomeAd" component={Home_Ad} options={{ title: 'Trang chủ' }} />
      <Drawer.Screen name="Add" component={ThemTruyen} options={{ title: 'Thêm truyện' }} />
      <Drawer.Screen name="ProAd" component={Profile_ad} options={{ title: 'Trang cá nhân' }} />
      <Drawer.Screen name="xuat" component={DangXuat} options={{ title: 'Đăng xuất' }} />
    </Drawer.Navigator>
  );
}

// Tạo Stack Navigator
const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mainnn"
        component={Tab} // Tab là màn hình Drawer
        options={{ headerShown: false }} // Ẩn header của màn hình Tab
      />

      <Stack.Screen
        name="ThemChuong"
        component={ThemChuong}
        options={{ title: 'Thêm chương mới' }} // Tiêu đề tùy chỉnh cho màn hình ThemChuong
      />

      <Stack.Screen
        name="ChiTiet"
        component={ComicDetail}
        options={{ title: 'Chi tiết truyện' }} // Tiêu đề tùy chỉnh cho màn hình ComicDetail
      />

      <Stack.Screen
        name="Chuong"
        component={Chuong}
        options={{ title: 'Chi tiết chương truyện' }} // Tiêu đề tùy chỉnh cho màn hình Chuong
      />

      <Stack.Screen
        name="Update"
        component={Update}
        options={{ title: 'Chỉnh sửa' }} // Tiêu đề tùy chỉnh cho màn hình Update
      />
    </Stack.Navigator>
  );
}
