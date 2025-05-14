// app/screens/KakaoMapScreen.tsx
import KakaoMap from "@/components/KakaoMap";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * 핸드폰에서 얻은 위치값과 실제 위치값에 조금의 오차가 있는 건 정상적이고 흔한 현상입니다. 아래에 그 이유들을 설명드릴게요.
 * | 종류       | 경도 (Longitude)   | 위도 (Latitude)    |
| -------- | ---------------- | ---------------- |
| 📱 앱 위치값 | 126.778649       | 35.1220401       |
| 📍 실제 위치 | 126.778690731022 | 35.1219729293528 |
| 🔍 차이    | 약 **0.0000417도** | 약 **0.0000671도** |
👉 이 정도 차이는 지상에서 약 4~7미터 수준입니다. 이 정도 오차는 GPS 오차 범위 내에서 매우 양호한 편이에요.
 */
export default function KakaoMapScreen() {
  const [longitude, setLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        // 1️⃣ 권한 요청
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("위치 권한이 거부되었습니다.");
          //   setLongitude(126.78269531238217);
          //   setLatitude(35.15038945063345);
          setLongitude(0);
          setLatitude(0);
          return;
        }
        // 2️⃣ 위치 정보 요청
        const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
        setLongitude(coords?.longitude ?? 0);
        setLatitude(coords?.latitude ?? 0);
      } catch (error) {
        console.error("위치 정보를 가져오는 데 실패했습니다:", error);
        setLongitude(0);
        setLatitude(0);
      }
    };

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>안녕하세요!</Text>
      {longitude ? <KakaoMap latitude={latitude} longitude={longitude} /> : <Text>위치를 가져오는 중입니다...</Text>}
      <Text>{"\n"}</Text>
      <Text>
        longitude : {longitude} {"\t"} latitude: {latitude}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fd",
  },
  text: {
    fontSize: 24,
  },
});
