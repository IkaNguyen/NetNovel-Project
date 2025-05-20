import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import Home from './home';
import List from './list';
import Search from './search';
import Profile from './profile';
import Truyen from './truyen';
import ChapterScreen from './ChapterScreen'; // ✅ Import đúng file bạn nói
import Login from '../login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ Tab navigation cho Home/List/Search/Profile
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 5,
        },
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
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="List" component={List} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={Search} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// ✅ Stack navigation chính, chứa các màn phụ như Truyen, ChapterScreen
export default function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mainn"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Truyen"
        component={Truyen}
        options={{ title: 'Chi tiết truyện' }}
      />
      <Stack.Screen
        name="ChapterScreen"
        component={ChapterScreen}
        options={{
          headerShown: true, // Header hiển thị mặc định
          title: 'Chương',    // Tiêu đề mặc định, có thể thay đổi bên trong ChapterScreen
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
