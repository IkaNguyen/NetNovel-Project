import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import InfoSample from './Info/InfoSample';
import Login from './Info/login';
import Register from './Info/register';
import AppNavigation from './Info/nab';
import Admin from './Info/admin';
import Profile from './Info/profile';
import Search from './Info/search';

import List from './Info/list';
import Home from './Info/home';
import Chap from './Info/chap';


import ChapterScreen from './Info/ChapterScreen';
const Stack = createStackNavigator();
export default function App() {
  return (
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
        <Stack.Screen name="Chap" component={Chap} options={{ headerShown: false }} />
       
      </Stack.Navigator>
    </NavigationContainer>
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
