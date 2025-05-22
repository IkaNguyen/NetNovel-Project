import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
    <Drawer.Navigator initialRouteName="HomeAd">
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
