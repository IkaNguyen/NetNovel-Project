import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native';
import { UserContext } from './UserContext';
import * as ImagePicker from 'expo-image-picker';

export default function Profile() {
  const { user, updateUser } = useContext(UserContext);
  const [newName, setNewName] = useState(user.name);
  const [newAvatar, setNewAvatar] = useState(user.avatar);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [newCoverPhoto, setNewCoverPhoto] = useState(user.coverPhoto); // New state for cover photo
  const [selectedCoverPhoto, setSelectedCoverPhoto] = useState(null); // For the selected cover photo
  const [editMode, setEditMode] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // New state to hide elements

  useEffect(() => {
    if (selectedAvatar) {
      setNewAvatar(selectedAvatar);
    }
    if (selectedCoverPhoto) {
      setNewCoverPhoto(selectedCoverPhoto);
    }
  }, [selectedAvatar, selectedCoverPhoto]);

  // Open image picker to change avatar
  const handleAvatarChange = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedAvatar(result.assets[0].uri);  // Update the selected avatar
    }
  };

  // Open image picker to change cover photo
  const handleCoverPhotoChange = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedCoverPhoto(result.assets[0].uri);  // Update the selected cover photo
    }
  };

  // Save changes (name, avatar, cover photo)
  const handleSave = () => {
    const avatarToSave = selectedAvatar || newAvatar;  // Use selected avatar or fallback to newAvatar
    const coverPhotoToSave = selectedCoverPhoto || newCoverPhoto;  // Use selected cover photo or fallback to newCoverPhoto
    setNewAvatar(avatarToSave);  // Update local state
    setNewCoverPhoto(coverPhotoToSave); // Update local cover photo state
    updateUser({ ...user, name: newName, avatar: avatarToSave, coverPhoto: coverPhotoToSave });  // Update user in context
    setEditMode(false);  // Exit edit mode
    setIsHidden(false); // Ensure elements are visible when saving
  };

  // Cancel the avatar and cover photo change
  const handleCancel = () => {
    setSelectedAvatar(newAvatar);  // Revert to the original avatar
    setSelectedCoverPhoto(newCoverPhoto);  // Revert to the original cover photo
    setEditMode(false);  // Exit edit mode
    setIsHidden(false); // Ensure elements are visible when canceling
  };

  // Key for the Image component to ensure re-render when the avatar changes
  const avatarKey = selectedAvatar || newAvatar;
  const coverPhotoKey = selectedCoverPhoto || newCoverPhoto;

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: coverPhotoKey }} style={styles.coverPhoto}> {/* Use cover photo */}
        <View style={styles.profileContainer}>
          {/* Hide avatar, cover photo, and username if isHidden is true */}
          {!isHidden && ( // Only render these elements if isHidden is false
            <>
              <Image
                source={{ uri: avatarKey }}  // Display either selected or saved avatar
                style={styles.avatar}
                key={avatarKey}  // Ensure the Image component re-renders on avatar change
              />

              <Text style={styles.username}>{newName}</Text>
            </>
          )}

          {editMode ? (
            <>
              {/* Input field for name */}
              <TextInput
                style={styles.input}
                value={newName}
                onChangeText={setNewName}
              />
              
              {/* Button to change avatar */}
              <TouchableOpacity onPress={handleAvatarChange} style={styles.changeAvatarButton}>
                <Text style={styles.changeAvatarText}>Thay đổi avatar</Text>
              </TouchableOpacity>
              
              {/* Button to change cover photo */}
              <TouchableOpacity onPress={handleCoverPhotoChange} style={styles.changeCoverPhotoButton}>
                <Text style={styles.changeCoverPhotoText}>Thay đổi ảnh bìa</Text>
              </TouchableOpacity>

              {/* Buttons for saving or cancelling */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Lưu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {/* Button to enable edit mode */}
              <TouchableOpacity onPress={() => { 
                setEditMode(true); 
                setIsHidden(true); // Hide the avatar, name, and cover photo when entering edit mode
              }} style={styles.editButton}>
                <Text style={styles.editButtonText}>+</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingTop: 10,
  },
  coverPhoto: { 
    width: '100%', 
    height: 180, 
    justifyContent: 'flex-end',
    marginTop: -40 , 
  },
  profileContainer: { 
    alignItems: 'center', 
    marginTop: -40,  // Giảm marginTop của profile container để không bị đẩy quá cao
  },
  avatar: {
    width: 120, 
    height: 120,
    borderRadius: 60,  
    borderWidth: 6,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,  
    marginBottom: -10, // Điều chỉnh marginBottom để không bị đẩy quá xa
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
    marginTop: 10,
    marginBottom: -100,  // Điều chỉnh marginBottom của username
  },
  input: {
    height: 45,  
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8, 
    width: '85%',
    paddingHorizontal: 15,
    marginTop: -20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',  
    paddingBottom: 3,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,  
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',  
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,  
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',  
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#D32F2F', // Red shadow effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    position: 'absolute',
    bottom: -2,
    right: -50,
    backgroundColor: '#009688',
    borderRadius: 30,
    padding: 12,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
   
  },
  editButtonText: { 
    fontSize: 24, 
    textAlign: 'center', 
    color: 'white' ,
  },
  changeAvatarButton: { 
    marginTop: 20, 
    padding: 10, 
    borderRadius: 5, 
    backgroundColor: '#EEEEEE', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  changeCoverPhotoButton: { 
    marginTop: 20, 
    padding: 10, 
    borderRadius: 5, 
    backgroundColor: '#EEEEEE', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  buttonContainer: { 
    flexDirection: 'row', 
    marginTop: 30, 
    width: '80%', 
    justifyContent: 'space-between',
  },
  changeAvatarText: { 
    fontSize: 16, 
    color: '#1E88E5', 
    fontWeight: '600',
  },
  changeCoverPhotoText: { 
    fontSize: 16, 
    color: '#1E88E5', 
    fontWeight: '600',
  },
  editButton: {
    position: 'absolute',
    bottom: -170,
    right: 10,
    backgroundColor: 'lightgray',
    borderRadius: 30,
    padding: 10,
    paddingBottom: 5,
    paddingTop: 5,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginRight: 1,
  },
  editButtonText: { fontSize: 24, textAlign: 'center', color: 'black' },
  changeAvatarButton: { marginTop: 10 },
  changeCoverPhotoButton: { marginTop: 10 },
  buttonContainer: { 
    flexDirection: 'row', 
    marginTop: 20, 
    width: '80%' 
  },
  changeAvatarText: { color: 'blue' },
  changeCoverPhotoText: { color: 'blue' },
});
