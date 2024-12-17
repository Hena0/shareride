import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';

interface SignupScreenProps {
  navigation: any;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }
    // 회원가입 처리 로직 (API 호출 등)
    console.log('Signup:', name, username, password, phoneNumber);
    navigation.navigate('Login');
  };

  const handleVerify = () => {
    // 전화번호 인증 로직
    console.log('Verify:', phoneNumber);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
      <TextInput
          style={styles.input}
          placeholder="이름"
          value={name}
          onChangeText={setName}
        />
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
        <TextInput
          style={styles.input}
          placeholder="비밀번호 재입력"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="전화번호"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>인증하기</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
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
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff'
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
  verifyButton: {
    backgroundColor: '#28a745', // 인증하기 버튼 배경색 (녹색 계열)
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#007bff', // 회원가입 버튼 배경색
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignupScreen;