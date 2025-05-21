import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface Button1Props {
  buttonText: string;
  onPress: () => void; // 💡 클릭했을 때 실행할 함수 타입
  color?: "blue" | "gray" | "red" | "green"; // 🔹 선택 가능한 색상들
  size?: "small" | "medium" | "large"; // 👉 버튼 크기 props 추가
}

export default function Button1({ buttonText, onPress, color = "blue", size = "medium" }: Button1Props) {
  const colorStyleMap: Record<NonNullable<Button1Props["color"]>, ViewStyle> = {
    blue: styles.blueButton,
    gray: styles.grayButton,
    red: styles.redButton,
    green: styles.greenButton,
  };
  const sizeStyleMap: Record<NonNullable<Button1Props["size"]>, ViewStyle> = {
    small: {
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    medium: {
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    large: {
      paddingVertical: 14,
      paddingHorizontal: 28,
    },
  };
  const textSizeMap: Record<NonNullable<Button1Props["size"]>, { fontSize: number }> = {
    small: { fontSize: 12 },
    medium: { fontSize: 16 },
    large: { fontSize: 20 },
  };

  return (
    <TouchableOpacity style={[styles.baseButton, colorStyleMap[color], sizeStyleMap[size]]} onPress={onPress}>
      <Text style={[styles.text, textSizeMap[size]]}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    margin: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  blueButton: {
    backgroundColor: "#007AFF",
  },
  grayButton: {
    backgroundColor: "#aaa",
  },
  redButton: {
    backgroundColor: "#FF3B30",
  },
  greenButton: {
    backgroundColor: "#34C759",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
