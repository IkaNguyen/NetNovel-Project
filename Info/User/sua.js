import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import { UserContext } from '../UserContext';

const Sua = ({ navigation }) => {
  const { user, updateUser } = useContext(UserContext);
  // Local state để chỉnh sửa thông tin
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [coverPhoto, setCoverPhoto] = useState(user.coverPhoto);
  // Xử lý lưu thông tin
  const handleSave = async () => {
    try {
      await updateUser({ name, avatar, coverPhoto });
      Alert.alert('✅ Thành công', 'Thông tin đã được cập nhật.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('❌ Lỗi', 'Không thể lưu thông tin.');
    }
  };
  // Đăng xuất nhưng vẫn giữ lại thông tin
  const handleLogout = async () => {
    try {
      await updateUser({ id: null }); // Chỉ xóa ID để đăng xuất, không xoá user
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('❌ Lỗi', 'Không thể đăng xuất.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Tên người dùng</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nhập tên mới"
      />

      <Text style={styles.label}>Link ảnh avatar</Text>
      <TextInput
        style={styles.input}
        value={avatar}
        onChangeText={setAvatar}
        placeholder="Nhập link avatar mới"
      />

      <Text style={styles.label}>Link ảnh bìa</Text>
      <TextInput
        style={styles.input}
        value={coverPhoto}
        onChangeText={setCoverPhoto}
        placeholder="Nhập link ảnh bìa mới"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>💾 Lưu Thay Đổi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>🚪 Đăng Xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF5733',
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Sua;