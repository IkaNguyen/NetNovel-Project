import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { UserContext } from '../UserContext';

const DangXuat = ({ navigation }) => {
  const { logout } = useContext(UserContext);

  // Hàm xử lý đăng xuất
  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login'); // Điều hướng đến màn hình Đăng Nhập
      Alert.alert('Thành công', 'Đã đăng xuất');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đăng xuất');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bạn muốn đăng xuất?</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Đăng Xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#3D8361',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default DangXuat;
