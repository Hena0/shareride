import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02; // 지도의 초기 확대/축소 수준
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface MarkerData {
    id: number;
    coordinate: {
      latitude: number;
      longitude: number;
    };
    imageUrl: string;
}
  
const markers: MarkerData[] = [
    {
      id: 1,
      coordinate: { latitude: 37.5665, longitude: 126.9780 }, // 서울 시청
      imageUrl: require('../assets/marker1.png'), // 첫 번째 마커 이미지
    },
    {
      id: 2,
      coordinate: { latitude: 37.5519, longitude: 127.0738 }, // 건국대학교
      imageUrl: require('../assets/marker2.png'), // 두 번째 마커 이미지
    },
    {
      id: 3,
      coordinate: { latitude: 37.5882, longitude: 127.0060 }, // 경희대학교
      imageUrl: require('../assets/marker3.png'), // 세 번째 마커 이미지
    },
];

const MainScreen: React.FC = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState({ // 지도의 초기 위치 (서울 시청)
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert('Error', errorMsg);
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
      setMapRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    })();
  }, []);

  const handleMarkerPress = (markerId: number) => {
    Alert.alert('Marker Pressed', `Marker ID: ${markerId}`);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
          >
            <View style={styles.userLocationMarker} />
          </Marker>
        )}

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            onPress={() => handleMarkerPress(marker.id)}
          >
            <Image source={marker.imageUrl} style={styles.markerImage} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: width,
    height: height,
  },
  userLocationMarker: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'blue',
    borderWidth: 2,
    borderColor: 'white'
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default MainScreen;