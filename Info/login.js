import React, { useState } from "react";
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

const Login = ({ navigation }) => {


  {
    /* tạo component nút */
  }
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
  {
    /* checkbox */
  }
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };

  // login
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      // Gửi yêu cầu GET đến API để lấy dữ liệu
      const response = await fetch(
        "https://6551ea355c69a7790329408a.mockapi.io/day"
      );
      const data = await response.json();

      // Kiểm tra xem tài khoản và mật khẩu nhập vào có trùng khớp với dữ liệu từ API hay không
      const user = data.find(
        (item) => item.account === account && item.pass === password
      );

      if (user) {
        // Kiểm tra vai trò của người dùng và chuyển hướng tới trang tương ứng
        if (user.role === "admin") {
          navigation.navigate("Admin");
        } else if (user.role === "user") {
          navigation.navigate("User");
        }

        // Đặt lại giá trị của các ô TextInput sau khi đăng nhập thành công
        setAccount("");
        setPassword("");
        Alert.alert("Đăng nhập thành công");
        console.log("Đăng nhập thành công");
      } else {
        console.log("Đã xảy ra lỗi");
      }
    } catch (error) {
      console.log("Đã xảy ra lỗi:", error);
    }
  };
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* tạo text */}

        <View>
          <Image
            source={require("../../assets/img/logo.png")}
            style={{ width: 180, height: 130, margin: 20 }}
          />
        </View>
        <Text style={styles.title1}>Welcome Back</Text>
        <Text style={styles.title2}>Đăng nhập khi đã có tài khoản</Text>


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
              value={account}
              onChangeText={setAccount}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
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
          <TouchableOpacity onPress={() => navigation.navigate("Reg")}>
            <Text style={styles.text1}>Tạo tài khoản</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/img/Subtract.png")} // Đường dẫn tới hình ảnh của bạn
            style={styles.image} // Đảm bảo hình ảnh chiếm toàn bộ không gian của View
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
    borderColor: "#4267B2",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxIcon: {
    width: 10,
    height: 10,
    backgroundColor: "#4267B2",
    borderRadius: 2,
  },
  text1: {
    marginLeft: 10,
    fontSize: 16,
    color: "#0A26BA",
    fontWeight: "700",
  },
  text2: {
    marginLeft: 10,
    fontSize: 16,
    color: "#4E84C1",
    fontWeight: "700",
  },
  forgotPasswordButton: {},
  forgotPasswordLabel: {
    fontSize: 16,
    color: "#DB4437",
    fontWeight: "700",
  },
  buttonLogin: {
    width: 200,
    borderRadius: 20,
    backgroundColor: "#4E84C1",
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
    fontSize: 32,
    color: "#4E84C1",
    fontWeight: "700",
    margin: 15,
    marginBottom: 71,
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
  image: {
    flex: 1,
    resizeMode: "cover", // Đảm bảo hình ảnh điều chỉnh kích thước để lấp đầy không gian
  },
});