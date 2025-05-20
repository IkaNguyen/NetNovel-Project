import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { UserProvider } from './Info/UserContext'; // Import UserProvider
import InfoSample from './Info/InfoSample';
import Login from './Info/login';
import Register from './Info/register';
import AppNavigation from './Info/User/nab';
import Admin from './Info/Admin/admin';
import Profile from './Info/User/profile';
import Search from './Info/User/search';
import ChapterScreen from './Info/User/ChapterScreen';
import List from './Info/User/list';
import Home from './Info/User/home';

import Sua from './Info/User/sua.js';
const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Info" component={InfoSample} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={AppNavigation} options={{ headerShown: false }} />
          <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }} />
          <Stack.Screen name="List" component={List} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
     
          <Stack.Screen name="Sua" component={Sua} options={{ headerShown: false }} />
          <Stack.Screen name="ChapterScreen" component={ChapterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});