import { Ionicons } from "@expo/vector-icons";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";

import { useRouter } from "expo-router";

const medicalSubjects = ["치과", "내과", "외과", "소아과", "정형외과", "신경과", "피부과", "안과", "이비인후과", "비뇨기과", "산부인과"];

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions(); // 화면 너비 감지
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 상단 타이틀 */}
        <Text style={styles.title}>병원찾기</Text>
        {/* 검색창 */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput style={styles.searchInput} placeholder="자유검색" />
        </View>
        {/* 이미지 - 반응형 */}
        <Image
          source={require("../../assets/images/hospital_cartoon.png")}
          style={{
            width: "100%",
            height: width * 0.5,
            marginTop: 20,
          }}
          resizeMode="contain"
        />{" "}
        {/* 진료과목 타이틀 */}
        <Text style={styles.sectionTitle}>진료과목</Text>
        {/* 진료과목 리스트 */}
        {medicalSubjects.map((item) => (
          <TouchableOpacity key={item} style={styles.subjectItem}>
            <Ionicons name="add-circle" size={24} color="#007AFF" />
            <Text style={styles.subjectText}>{item}</Text>
          </TouchableOpacity>
        ))}{" "}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fef9f4",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
  subjectItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f6fa",
    padding: 12,
    marginTop: 10,
    borderRadius: 10,
  },
  subjectText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
