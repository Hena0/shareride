// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   Alert,
//   Image,
//   TouchableOpacity
// } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import * as Location from 'expo-location';

// const { width, height } = Dimensions.get('window');

// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.02; // 지도의 초기 확대/축소 수준
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// interface MarkerData {
//     id: number;
//     coordinate: {
//       latitude: number;
//       longitude: number;
//     };
//     imageUrl: string;
// }
  
// const markers: MarkerData[] = [
//     {
//       id: 1,
//       coordinate: { latitude: 37.5665, longitude: 126.9780 }, 
//       imageUrl: require('../assets/alphaca.png'), 
//     },
//     {
//       id: 2,
//       coordinate: { latitude: 37.5519, longitude: 127.0738 }, 
//       imageUrl: require('../assets/beam.png'), 
//     },
//     {
//       id: 3,
//       coordinate: { latitude: 37.5882, longitude: 127.0060 }, 
//       imageUrl: require('../assets/swing.png'), 
//     },
// ];

// const MainScreen: React.FC = () => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [mapRegion, setMapRegion] = useState({ // 지도의 초기 위치 (서울 시청)
//     latitude: 37.5665,
//     longitude: 126.9780,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA,
//   });

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         Alert.alert('Error', errorMsg);
//         return;
//       }

//       let userLocation = await Location.getCurrentPositionAsync({});
//       setLocation(userLocation);
//       setMapRegion({
//         latitude: userLocation.coords.latitude,
//         longitude: userLocation.coords.longitude,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA,
//       });
//     })();
//   }, []);

//   const handleMarkerPress = (markerId: number) => {
//     Alert.alert('Marker Pressed', `Marker ID: ${markerId}`);
//   };

//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} region={mapRegion}>
//         {location && (
//           <Marker
//             coordinate={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             }}
//             title="Your Location"
//           >
//             <View style={styles.userLocationMarker} />
//           </Marker>
//         )}

//         {markers.map((marker) => (
//           <Marker
//             key={marker.id}
//             coordinate={marker.coordinate}
//             onPress={() => handleMarkerPress(marker.id)}
//           >
//             <Image source={marker.imageUrl} style={styles.markerImage} />
//           </Marker>
//         ))}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   map: {
//     width: width,
//     height: height,
//   },
//   userLocationMarker: {
//     width: 15,
//     height: 15,
//     borderRadius: 7.5,
//     backgroundColor: 'blue',
//     borderWidth: 2,
//     borderColor: 'white'
//   },
//   markerImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
// });

// export default MainScreen;


import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchCamera } from 'react-native-image-picker';

const MainScreen = () => {
  const navigation = useNavigation();

  // 카메라 실행 함수
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        Alert.alert('카메라가 취소되었습니다.');
      } else if (response.errorCode) {
        Alert.alert('에러', response.errorMessage || '카메라 실행 중 오류가 발생했습니다.');
      } else {
        console.log('Camera Response:', response);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/map.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
          <Text style={styles.buttonText}>📷</Text>
        </TouchableOpacity>
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
});

export default MainScreen;
