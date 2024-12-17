import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text
} from 'react-native';
import Logo from '../components/Logo';

interface LoginScreenProps {
    navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 처리 로직 (API 호출 등)
    console.log('Login:', username, password);
    navigation.navigate('Main');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
        <Logo />
        <TextInput
          style={styles.input}
          placeholder="아이디"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  form: {
    width: '80%', // 입력 필드와 버튼의 너비를 화면 너비의 80%로 설정
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5'
  },
  loginButton: {
    backgroundColor: '#59D853', // 로그인 버튼 배경색
    padding: 12,
    borderRadius: 500,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
    signupButton: {
        backgroundColor: '#59D853', // 회원가입 버튼 배경색 (회색 계열)
        padding: 12,
        borderRadius: 500,
        alignItems: 'center',
  },
    signupButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
  },
});

export default LoginScreen;