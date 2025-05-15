// app/(tabs)/KakaoMapScreen.tsx
import KakaoMap from "@/components/KakaoMap";
// 📍 expo-location은 현재 위치를 가져오기 위한 라이브러리입니다.
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function KakaoMapScreen() {
  // 📌 현재 위치의 경도(longitude)를 저장할 상태 변수입니다.
  const [longitude, setLongitude] = useState<number>();
  // 📌 현재 위치의 위도(latitude)를 저장할 상태 변수입니다.
  const [latitude, setLatitude] = useState<number>();

  // ⚙️ 컴포넌트가 처음 렌더링될 때 한 번 실행되는 코드입니다.
  useEffect(() => {
    // 📌 비동기로 위치 정보를 가져오는 함수입니다.
    const getCurrentLocation = async () => {
      // 현재 위치 가져오기
      try {
        const { coords } = await Location.getCurrentPositionAsync({});
        setLongitude(coords?.longitude ?? 0);
        setLatitude(coords?.latitude ?? 0);
      } catch (error) {
        console.error("위치 정보를 가져오는 데 실패했습니다:", error);
        setLongitude(126.78269531238217);
        setLatitude(35.15038945063345);
      }
    };
    getCurrentLocation();
  }, []);

  // 📱 화면에 실제로 보여줄 UI를 정의합니다.
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>카카오맵 웹뷰로 띄우기</Text>
      {longitude ? <KakaoMap latitude={latitude} longitude={longitude} /> : <Text>위치를 가져오는 중입니다...</Text>}
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
