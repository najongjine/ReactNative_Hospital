import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

interface location_type {
  user_long: number;
  user_lat: number;
  place_long: number;
  place_lat: number;
}

export default function KakaoMap({ user_lat, user_long, place_lat, place_long }: location_type) {
  if (Platform.OS === "web") {
    // 📱 웹에서는 구글맵이 지원되지 않으므로 간단한 메시지를 출력
    return (
      <View style={styles.webFallback}>
        <Text>웹에서는 지도를 지원하지 않습니다. 모바일에서 확인해주세요.</Text>
      </View>
    );
  }

  const region = {
    latitude: (user_lat + place_lat) / 2,
    longitude: (user_long + place_long) / 2,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        <Marker
          coordinate={{ latitude: user_lat, longitude: user_long }}
          title="출발지"
          description="당신의 현재 위치"
        />
        <Marker
          coordinate={{ latitude: place_lat, longitude: place_long }}
          title="도착지"
          description="선택한 병원 위치"
        />
        <Polyline
          coordinates={[
            { latitude: user_lat, longitude: user_long },
            { latitude: place_lat, longitude: place_long },
          ]}
          strokeColor="blue"
          strokeWidth={3}
        />
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
  webFallback: {
    width: 300,
    height: 300,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
