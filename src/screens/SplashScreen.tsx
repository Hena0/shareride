import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from '../components/Logo';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000); // 2초 후 로그인 화면으로 이동
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // 배경색
  },
});

export default SplashScreen;