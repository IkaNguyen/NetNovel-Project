import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home';
import List from './list';
import Search from './search';
import Profile from './profile';
import Truyen from './truyen';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'; // Dùng FontAwesome5 của expo
import Login from '../login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// TabNavigator để chuyển đổi giữa các tab
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 5,
        },
       // tabBarShowLabel: false,  // Ẩn chữ tên tab ở dưới icon
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#aaa',
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <FontAwesome5 name="home" size={size} color={color} />;
          } else if (route.name === 'List') {
            return <FontAwesome5 name="bars" size={size} color={color} />;
          } else if (route.name === 'Search') {
            return <FontAwesome5 name="search" size={size} color={color} />;
          } else if (route.name === 'Profile') {
            return <FontAwesome5 name="user-circle" size={size} color={color} />;
          }
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

// AppNavigation: Gói cả TabNavigator và StackNavigator
export default function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mainn"
        component={TabNavigator} // TabNavigator cho màn hình chính
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Truyen"
        component={Truyen} // Truyen là màn hình chi tiết của truyện
      />
    </Stack.Navigator>
  );
}
