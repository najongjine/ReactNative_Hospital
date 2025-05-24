import React, { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text } from "react-native";
import CustomModal from "../../components/CustomModal";
import HospitalDetail from "../../components/HospitalDetail";
import HospitalList from "../../components/HospitalList";
import { KakaoPlace } from "../hooks/kakaomap_api_type";

const SCREEN_HEIGHT = Dimensions.get("window").height;

/**
[ SearchResultsScreen ]
    ├── HospitalList (목록만 보여줌)
    ├── CustomModal (모달은 여기 있음)
    └── onPress: 병원 클릭하면 모달 열기

| 컴포넌트                    | 역할 설명                                   |
| ----------------------- | --------------------------------------- |
| **HospitalList**        | 병원들 리스트만 화면에 그려줌                        |
| **SearchResultsScreen** | 모달을 띄울지 말지 결정함<br>어떤 병원이 선택됐는지도 여기서 관리함 |

  onPress={(hospital) => {
    setSelectedHospital(hospital);
    setModalVisible(true);
  }}
컴포넌트 HospitalList에 props로 전달되고 있어요:
<HospitalList data={병원목록} onPress={뭔가실행할함수} />

[HospitalList 컴포넌트]
 ↓ 병원 하나 클릭
 ↓ onPress(item) 실행
 ↓ item은 병원 하나의 객체

[SearchResultsScreen 컴포넌트]
 ↑ (hospital) => { ... } 로 받음
 ↑ setSelectedHospital(hospital)
 ↑ setModalVisible(true)

그래서 search_results_screen.tsx 안에서 직접 hospital이라는 변수를 선언하지 않아도 됩니다.
그건 부모 컴포넌트가 콜백 함수에서 받는 "입력값"일 뿐이에요.

 여기서 (hospital) => { ... }
➡ 이건 **"즉석에서 만든 함수"**이고,
➡ 자식인 HospitalList한테 props로 넘겨주는 콜백 함수입니다.
콜백 = 함수	어떤 일이 일어났을 때 실행하라고 넘겨주는 "대기 중인 함수"

   */

export default function MyFavList() {
  const [hospitalList, setHospitalList] = useState<KakaoPlace[] | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<KakaoPlace | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [hospitalListStatus, setHospitalListStatus] = useState<"loading" | "data_exists" | "error">("loading");
  const [favoriteStatus, setFavoriteStatus] = useState<"loading" | "favorited" | "not_favorited" | "error">("loading");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>즐겨찾기 리스트</Text>
      <HospitalList
        data={hospitalList ?? []}
        // 함수를 바로 선언함과 동시에 자식한테 쓰라고 넘겨주기
        onPress={(hospital) => {
          setSelectedHospital(hospital);
          setModalVisible(true);
        }}
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
