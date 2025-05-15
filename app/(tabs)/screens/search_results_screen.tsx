import React, { useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomModal from "../../../components/CustomModal";
import HospitalDetail from "../../../components/HospitalDetail";

type Hospital = {
  name: string;
  department: string;
  address: string;
  phone: string;
};

const hospitalData = [
  {
    name: "Sunnyvale Hospital",
    department: "Pediatrics",
    address: "123 Elm St, Springfield, IL",
    phone: "(217) 555-0123",
  },
  {
    name: "Greenwood Medical Center",
    department: "Cardiology",
    address: "456 Oak St, Lincoln, NE",
    phone: "(402) 555-0147",
  },
  {
    name: "Riverside Hospital",
    department: "Orthopedics",
    address: "789 Pine St, Columbus, OH",
    phone: "(614) 555-0198",
  },
];

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function SearchResultsScreen() {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (hospital: any) => {
    setSelectedHospital(hospital);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Search Results</Text>
      <FlatList
        data={hospitalData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.department}>{item.department}</Text>
            <Text style={styles.info}>{item.address}</Text>
            <Text style={styles.info}>{item.phone}</Text>
          </TouchableOpacity>
        )}
      />{" "}
      {/* 모달창 */}
      <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        {/* 만약 selectedHospital(선택된 병원)이 있다면, <HospitalDetail />(병원 정보창)을 모달 안에 보여줘!
        | selectedHospital 값    | 결과                         |
        | --------------------- | -------------------------- |
        | `null` 또는 `undefined` | 아무것도 렌더링 안됨 (모달 안이 비어 있음)  |
        | 병원 객체 있음              | `<HospitalDetail />`가 렌더링됨 |
         */}
        {selectedHospital && <HospitalDetail hospital={selectedHospital} />}
      </CustomModal>
      {/* 모달창 END */}
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
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fdfdf9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 2, // for Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#072c2c",
  },
  department: {
    fontSize: 16,
    marginTop: 4,
    color: "#333",
  },
  info: {
    marginTop: 2,
    color: "#444",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    paddingVertical: 40, // 여백 확보
  },

  modalContent: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 16,
    width: "85%",
    minHeight: 250, // 최소 보장
    maxHeight: SCREEN_HEIGHT * 0.85, // 화면보다 넘지 않게 제한
  },

  modalScrollContent: {
    alignItems: "center",
    paddingBottom: 40, // ✨ 닫기 버튼 공간 확보
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
