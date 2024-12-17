import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
        <Image
        style={styles.logo}
        source={require('../assets/logo.png')} // 실제 로고 이미지 경로로 변경
        resizeMode="contain"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // 로고를 중앙 정렬
    marginBottom: 30,    // 하단 여백
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default Logo;