import React, { useState, useRef } from "react";
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


const Register = ({ navigation }) => {
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

  // dang ky
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [pass, setPass] = useState("");

  const handleRegister = async () => {
    // Tạo đối tượng dữ liệu mới từ giá trị nhập
    const data = {
      name: name,
      account: account,
      pass: pass,
      role: "user", // Giá trị mặc định cho role
    };
    try {
      // Gửi yêu cầu POST đến API
      const response = await fetch(
        "https://682c340ad29df7a95be5faa8.mockapi.io/netnovel/role",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // Xử lý khi tạo dữ liệu thành công
        console.log("Tạo dữ liệu thành công");
        setName("");
        setAccount("");
        setPass("");
        nameInputRef.current.focus();
        Alert.alert("Đăng ký thành công");
        navigation.navigate("Login");
        // ToastAlert(1, toast.show, "top-accent", "Thành công" ,"Đăng ký thành công");


      } else {
        // Xử lý khi gặp lỗi
        console.log("Đã xảy ra lỗi");
      }
    } catch (error) {
      console.log("Đã xảy ra lỗi:", error);
    }
  };

  // con trỏ về ô input name
  const nameInputRef = useRef(null);



  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* tạo text */}

        <Text style={styles.title1}></Text>
        <Text style={styles.title2}>Đăng kí</Text>


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
      
        <View style={styles.containerInput}>
         
          <View style={styles.inputContainer}>
            <TextInput
              ref={nameInputRef}
              style={styles.input}
              placeholder="Họ và tên"
              placeholderTextColor="white"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Ô nhập Tài khoản */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tài khoản"
              placeholderTextColor="white"
              value={account}
              onChangeText={setAccount}
            />
          </View>

          {/* Ô nhập Mật khẩu */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              placeholderTextColor="white"
              secureTextEntry
              value={pass}
              onChangeText={setPass}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.buttonLogin} onPress={handleRegister}>
          <Text style={styles.buttonTextLogin}>Đăng ký</Text>
        </TouchableOpacity>

        <View style={styles.checkandforgot2}>
          <Text style={styles.text2}>Bạn đã có tài khoản?</Text>
          <TouchableOpacity style={styles.buttonGoToLogin} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.text1}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>



        <View style={styles.imageContainer}>
          <Image
            source={require("./img.jpg")} // Đường dẫn tới hình ảnh của bạn
            style={{ width: 400, height: 670, marginRight: 20 }} // Đảm bảo hình ảnh chiếm toàn bộ không gian của View
          />
        </View>
      </View>

    </ScrollView>
  );
};

export default Register;

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
    marginBottom: 30,
  },
  checkandforgot2: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 15,
    marginBottom: 174,
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
    color: "#DB4437",
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
    marginTop: 20,
    marginBottom: 20,
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
    fontSize: 18,
    color: "#4E84C1",
    lineHeight: 26,
    fontWeight: "700",
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
  buttonGoToLogin: {
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
});