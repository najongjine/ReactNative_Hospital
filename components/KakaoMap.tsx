// GoogleMap.tsx

import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface location_type {
  user_long: number;
  user_lat: number;
  place_long: number;
  place_lat: number;
}

export default function KakaoMap({ user_lat, user_long, place_lat, place_long }: location_type) {
  const mapRef = useRef<MapView>(null);

  // 도착지로 카메라 이동
  useEffect(() => {
    const region = {
      latitude: place_lat,
      longitude: place_long,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 1000); // 1초 동안 부드럽게 이동
    }
  }, [place_lat, place_long]); // place_lat/long 변경 시마다 실행

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: place_lat,
          longitude: place_long,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* 도착지 마커 */}
        <Marker coordinate={{ latitude: place_lat, longitude: place_long }} title="도착지" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  map: {
    flex: 1,
  },
});
