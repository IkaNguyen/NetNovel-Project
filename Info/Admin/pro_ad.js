import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../UserContext';

const Profile_ad = ({ navigation }) => {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.coverPhoto }} style={styles.coverPhoto} />

   
      <Image source={{ uri: user.avatar }} style={styles.avatar} />

     
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name}</Text>
       
      </View>


      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Sua_ad')}>
        <Text style={styles.editButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center',  marginTop: 20 },

  coverPhoto: {
    width: '100%',
    height: 200,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    position: 'absolute',
    top: 140, // avatar nổi lên trên ảnh bìa
    zIndex: 2,
    backgroundColor: '#fff',
  },

  infoContainer: {
    marginTop: 80, // đẩy xuống dưới avatar (avatar cao 120 + khoảng cách)
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },

  role: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },

  

  editButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#3D8361',
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  editButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Profile_ad;
