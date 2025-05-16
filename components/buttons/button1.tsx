import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Button1Props {
  buttonText: string;
  onPress: () => void; // 💡 클릭했을 때 실행할 함수 타입
}

export default function Button1({ buttonText, onPress }: Button1Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    margin: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
