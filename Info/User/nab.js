import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home';
import List from './list';
import Search from './search';
import Profile from './profile';
import Truyen from './truyen';
import { UserProvider } from '../UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// TabNavigator để chuyển đổi giữa các tab
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#aaa',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="numeric-1-circle" size={24} color="#007bff" />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={List}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="numeric-2-circle" size={24} color="#007bff" />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="numeric-3-circle" size={24} color="#007bff" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="numeric-4-circle" size={24} color="#007bff" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// AppNavigation: Gói cả TabNavigator và StackNavigator
export default function AppNavigation() {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}
