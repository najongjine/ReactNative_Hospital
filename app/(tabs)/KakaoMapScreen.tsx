// app/(tabs)/KakaoMapScreen.tsx
import KakaoMap from "@/components/KakaoMap";
// 📍 expo-location은 현재 위치를 가져오기 위한 라이브러리입니다.
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface location_type {
  user_long: number;
  user_lat: number;
  place_long: number;
  place_lat: number;
}
export default function KakaoMapScreen() {
  const { locationData } = useLocalSearchParams();
  const parsedLocationData = JSON.parse((locationData ?? null) as any) as location_type;
  // ⚙️ 컴포넌트가 처음 렌더링될 때 한 번 실행되는 코드입니다.
  useEffect(() => {}, []);

  // 📱 화면에 실제로 보여줄 UI를 정의합니다.
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>카카오맵 웹뷰로 띄우기</Text>
      {parsedLocationData.place_long ? (
        <KakaoMap
          user_lat={parsedLocationData.user_lat}
          user_long={parsedLocationData.user_long}
          place_lat={parsedLocationData.place_lat}
          place_long={parsedLocationData.place_long}
        />
      ) : (
        <Text>위치를 가져오는 중입니다...</Text>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fd",
  },
  text: {
    fontSize: 24,
  },
});
