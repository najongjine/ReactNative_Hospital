// components/HospitalList.tsx
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as kakao_api_type from "../app/hooks/kakaomap_api_type";

interface HospitalListProps {
  data: kakao_api_type.KakaoPlace[];
  onPress: (hospital: kakao_api_type.KakaoPlace) => void;
}

/**
"자식(HospitalList)에서 setModalVisible(true) 같은 함수를 실행하면, 부모는 그걸 어떻게 알아?"

자식이 직접 setModalVisible(true)를 실행하는 게 아니라,
부모가 만든 함수를 자식에게 "props로 전달"해준 거예요.

즉:

자식은 부모한테 “눌렸어요!”라고 알려주고,
부모가 그걸 받아서 setModalVisible(true)를 실행하는 거예요.

SearchResultsScreen (부모)
│
├─ HospitalList (자식)
│     └─ onPress → 병원 클릭 시, 부모가 만든 함수 실행됨
│
├─ handlePress()
│     ├─ setSelectedHospital()
│     └─ setModalVisible(true)
│
└─ <CustomModal visible={modalVisible} />

onPress={() => onPress(item)} : 
👉 자식은 props.onPress()를 직접 실행하는 게 아니라,
👉 부모가 전달한 함수를 실행만 하는 거예요!
 */
export default function HospitalList({ data, onPress }: HospitalListProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item?.place_name ?? ""}
      renderItem={({ item }) => (
        /**
         * 익명 함수(화살표 함수)를 하나 새로 만들어서 넘김
            버튼을 누르면 이 익명 함수가 실행되고, 그 안에서 onPress(item)이 실행됨
            즉, item이라는 값을 넘기고 싶을 때 사용하는 패턴
         */
        <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
          <Text style={styles.name}>{item?.place_name ?? ""}</Text>
          <Text style={styles.department}>{item?.category_name ?? ""}</Text>
          <Text style={styles.info}>{item?.address_name ?? ""}</Text>
          <Text style={styles.info}>{item?.phone ?? ""}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fdfdf9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
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
});
