import React, { useState, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { UserContext } from './UserContext'; // Đảm bảo đường dẫn đúng

const Login = ({ navigation }) => {
  const { updateUser } = useContext(UserContext); // Sử dụng useContext để lấy updateUser
  const [isLogged, setIsLogged] = useState(false); // Trạng thái để kiểm soát log

  const ButtonWithIcon = ({ iconName, text, color, backgroundColor }) => {
    return (
      <TouchableOpacity style={[styles.button, { backgroundColor }]}>
        <View style={styles.buttonContent}>
          <Icon name={iconName} size={20} color={color} />
          <Text style={[styles.buttonText, { color }]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://682c340ad29df7a95be5faa8.mockapi.io/netnovel/role");
      const data = await response.json();
  
      const user = data.find(item => item.account === account && item.pass === password);
  
      if (user) {
        const userDetails = {
          name: user.name,
          account: user.account,
          id: user.id,
          avatar: user.avatar || 'https://i.pinimg.com/736x/92/5d/be/925dbea5ea9998a2339f1e4b6ada86de.jpg',
          coverPhoto: user.coverPhoto || 'https://i.pinimg.com/736x/3c/40/db/3c40db60080ca38939be4bd5fb90bf98.jpg',
          role: user.role,
        };
        updateUser(userDetails); // Cập nhật thông tin người dùng
        
        // Log thông tin người dùng chỉ một lần
        if (!isLogged) {
          console.log(userDetails);
          setIsLogged(true); // Đánh dấu là đã log
        }

        // Kiểm tra vai trò của người dùng và chuyển hướng tới trang tương ứng
        if (user.role === "admin") {
          navigation.navigate("Tab"); // Điều hướng tới trang Admin
        } else if (user.role === "user") {
          navigation.navigate("Main"); // Điều hướng tới trang Main
        }
  
        // Đặt lại giá trị của các ô TextInput sau khi đăng nhập thành công
        setAccount("");
        setPassword("");
        Alert.alert("Đăng nhập thành công");
      } else {
        Alert.alert("Thông tin đăng nhập không chính xác");
      }
    } catch (error) {
      console.log("Đã xảy ra lỗi:", error);
    }
  };
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* tạo text */}


        <Text style={styles.title1}></Text>
        <Text style={styles.title2}>Đăng nhập</Text>


        {/* tạo nút */}
        <View style={styles.buttonContainer}>
          <ButtonWithIcon
            iconName="facebook"
            text="Facebook"
            color="#ffffff"
            backgroundColor="#4267B2"
          />
          <ButtonWithIcon
            iconName="google"
            text="Google"
            color="#ffffff"
            backgroundColor="#DB4437"
          />
        </View>
        {/* tạo ô input */}
        <View style={styles.containerInput}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tài khoản"
              placeholderTextColor="white"
              value={account}
              onChangeText={setAccount}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              placeholderTextColor="white"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.checkandforgot}>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                activeOpacity={0.7}
                onPress={handleCheckboxPress}
              >
                {/* Hiển thị biểu tượng check khi isChecked là true */}
                {isChecked && <View style={styles.checkboxIcon} />}
              </TouchableOpacity>
              <Text style={styles.text1}>Nhớ mật khẩu</Text>
            </View>

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => navigation.navigate("Register")}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordLabel}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
          <Text style={styles.buttonTextLogin}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={styles.checkandforgot2}>
          <Text style={styles.text2}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity style={styles.buttonCreateAcc} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.text1}>Tạo tài khoản</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require("./img.jpg")} // Đường dẫn tới hình ảnh của bạn
            style={{ width: 400, height: 670, marginRight: 20}} 
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    margin: 15,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
    width: 150,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonCreateAcc: {
    width: 119,
    borderRadius: 20,
    backgroundColor: "#009999",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
    marginLeft: 10,
    paddingRight: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 300,
    alignItems: "center",
    color: "#ffffff"
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkandforgot: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 15,
  },
  checkandforgot2: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 15,
    marginBottom: 164,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxIcon: {
    width: 10,
    height: 10,
    backgroundColor: "#ffffff",
    borderRadius: 2,
  },
  text1: {
    marginLeft: 10,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "700",
  },
  text2: {
    marginLeft: 10,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "700",
  },
  forgotPasswordButton: {},
  forgotPasswordLabel: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "700",
  },
  buttonLogin: {
    width: 200,
    borderRadius: 20,
    backgroundColor: "#009999",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 20,
    marginTop: 10,
  },
  buttonTextLogin: {
    color: "white",
    fontSize: 16,
  },

  title1: {
    fontSize: 18,
    color: "#4E84C1",
    fontWeight: "700",
    margin: 10,
  },
  title2: {
    fontSize: 40,
    color: "#d6e7ee",
    fontWeight: "700",
    margin: 15,
    marginBottom: 45,
  },
  title3: {
    fontSize: 15,
    color: "#4E84C1",
    lineHeight: 26,
    fontWeight: "400",
    margin: 15,
  },
  imageContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    // Đảm bảo hình ảnh nằm dưới nội dung
  },

});