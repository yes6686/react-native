import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { auth } from "../firebaseConfig"; // Firebase 설정 파일
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("회원가입 성공", "계정이 생성되었습니다.");
      navigation.navigate("Login"); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      setErrorMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Run the Word</Text>
      <Text style={styles.subtitle}>회원가입</Text>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="이메일"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrorMessage(""); // 입력 시 에러 메시지 초기화
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrorMessage(""); // 입력 시 에러 메시지 초기화
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          setErrorMessage(""); // 입력 시 에러 메시지 초기화
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.footerText}>로그인 페이지로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6A0DAD",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#6A0DAD",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#6A0DAD",
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});
