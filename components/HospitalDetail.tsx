// components/HospitalDetail.tsx
import React from "react";
import { StyleSheet, Text } from "react-native";
import * as kakao_api_type from "../app/hooks/kakaomap_api_type";



export default function HospitalDetail({ hospital }: { hospital: kakao_api_type.KakaoPlace }) {
  if (!hospital) return null;

  return (
    <>
      <Text style={styles.title}>{hospital?.place_name ?? ""}</Text>
      <Text>{hospital?.category_name ?? ""}</Text>
      <Text>{hospital?.address_name ?? ""}</Text>
      <Text>{hospital?.phone ?? ""}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
