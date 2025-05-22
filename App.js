import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { UserProvider } from './Info/UserContext'; // Import UserProvider
import InfoSample from './Info/InfoSample';
import Login from './Info/login';
import Register from './Info/register';
import AppNavigation from './Info/User/nab';
import Update from './Info/Admin/update_ad.js';
import Profile from './Info/User/profile';
import Search from './Info/User/search';
import ChapterScreen from './Info/User/ChapterScreen';
import List from './Info/User/list';
import Home from './Info/User/home';
import Tab from './Info/Admin/tab_ad.js';
import Sua from './Info/User/sua.js';
import Chuong from './Info/Admin/chuong_ad.js';
import Sua_ad from './Info/Admin/sua_ad.js';
import Profile_ad from './Info/Admin/home_ad.js';
import ThemChuong from './Info/Admin/them_ad.js';
import Home_Ad from './Info/Admin/home_ad.js';
import ComicDetail from './Info/Admin/hienthi_ad.js';
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
          <Stack.Screen name="ComicDetail" component={ComicDetail}  options={{ title: 'Chi tiết truyện' }} />
          <Stack.Screen name="List" component={List} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
           <Stack.Screen name="Tab" component={Tab} options={{ headerShown: false }} />
           <Stack.Screen name="Sua_ad" component={Sua_ad} options={{ headerShown: false }} />
          <Stack.Screen name="Profile_ad" component={Profile_ad} options={{ headerShown: false }} />
          <Stack.Screen name="ThemChuong" component={ThemChuong}  options={{ title: 'Thêm chap truyện' }} />
          <Stack.Screen name="Sua" component={Sua} options={{ headerShown: false }} />
          <Stack.Screen name="Home_ad" component={Home_Ad} options={{ headerShown: false }} />
            <Stack.Screen name="update" component={Update} options={{ title: 'Chỉnh sửa' }}  />
              <Stack.Screen name="Chuong" component={Chuong}  options={{ title: 'Chi tiết chương truyện' }} />
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