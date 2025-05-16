// components/HospitalDetail.tsx
import React from "react";
import { StyleSheet, Text } from "react-native";

type Hospital = {
  name: string;
  department: string;
  address: string;
  phone: string;
};

export default function HospitalDetail({ hospital }: { hospital: Hospital }) {
  if (!hospital) return null;

  return (
    <>
      <Text style={styles.title}>{hospital?.name ?? ""}</Text>
      <Text>{hospital?.department ?? ""}</Text>
      <Text>{hospital?.address ?? ""}</Text>
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
