import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { launchCamera, Asset } from 'react-native-image-picker';
import analyzeImage from '../services/geminiService'; // 사진 분석 서비스 호출

const MainScreen = () => {
  const [photo, setPhoto] = useState<string | null>(null); // 촬영된 사진 URI 저장
  const [result, setResult] = useState<string | null>(null); // 분석 결과 저장

  // Android 카메라 권한 요청
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '카메라 접근 권한 요청',
          message: '이 앱이 카메라에 접근하려면 권한이 필요합니다.',
          buttonNeutral: '나중에',
          buttonNegative: '취소',
          buttonPositive: '허용',
        }
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('권한 거부됨', '카메라 권한이 필요합니다.');
        return false;
      }
    }
    return true;
  };

  // 카메라 버튼 클릭 시 호출
  const handleTakePhoto = async () => {
    const permissionGranted = await requestCameraPermission();
    if (!permissionGranted) return;

    try {
      const response = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true, // 사진을 갤러리에 저장
      });

      if (response.didCancel) {
        Alert.alert('취소됨', '사진 촬영이 취소되었습니다.');
        return;
      }

      if (response.errorCode || response.errorMessage) {
        Alert.alert(
          '오류',
          `사진 촬영 중 오류가 발생했습니다: ${response.errorMessage || response.errorCode}`
        );
        return;
      }

      const asset: Asset | undefined = response.assets?.[0];
      if (asset?.uri) {
        const photoUri = asset.uri;
        setPhoto(photoUri);

        // 사진 분석 호출
        const analysis = await analyzeImage(photoUri);
        setResult(analysis);

        // 결과 알림
        Alert.alert('분석 결과', analysis);
      } else {
        Alert.alert('오류', '사진을 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('사진 촬영 또는 분석 중 오류:', error);
      Alert.alert('오류', '사진 촬영 중 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/map.png')} // 지도 이미지
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>📷</Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>분석 결과: {result}</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
    flex: 1,
  },
  cameraButton: {
    position: 'absolute',
    top: 35,
    right: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 15,
  },
  resultText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MainScreen;
