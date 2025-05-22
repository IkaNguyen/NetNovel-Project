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

const Sua_ad = ({ navigation }) => {
  const { user, updateUser, logout } = useContext(UserContext);

  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [coverPhoto, setCoverPhoto] = useState(user.coverPhoto);

  const handleSave = async () => {
    try {
      await updateUser({
        id: user.id, // giữ lại ID
        name,
        avatar,
        coverPhoto,
      });
      Alert.alert('✅ Thành công', 'Thông tin đã được cập nhật.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('❌ Lỗi', 'Không thể lưu thông tin.');
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
        <Text style={styles.saveButtonText}> Lưu Thay Đổi</Text>
      </TouchableOpacity>

   
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 50,
    flexGrow: 1,
    backgroundColor: '#FAFAFA', // nền sáng nhẹ, trung tính
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444', // màu chữ tối nhưng nhẹ hơn đen
    marginTop: 15,
    marginBottom: 8,
    letterSpacing: 0.4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC', // viền nhạt, nhẹ nhàng
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#555',
    // shadow rất nhẹ nhàng để tạo độ sâu
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  saveButton: {
    backgroundColor: '#3D8361', // xanh xám nhẹ, tinh tế, thanh lịch
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // shadow nhẹ, tinh tế
    shadowColor: '#607D8B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonText: {
    color: '#F5F5F5', // màu chữ sáng nhẹ, dễ nhìn
    fontWeight: '600',
    fontSize: 17,
    letterSpacing: 1,
  },
  logoutButton: {
    backgroundColor: '#3D8361', // đỏ nhạt, không quá chói, nhẹ nhàng
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E57373',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
    letterSpacing: 1,
  },
});

export default Sua_ad;
