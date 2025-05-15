import React, {useState} from "react";
import {
	FlatList,
	Modal,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";

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
		phone: "(217) 555-0123"
	}, {
		name: "Greenwood Medical Center",
		department: "Cardiology",
		address: "456 Oak St, Lincoln, NE",
		phone: "(402) 555-0147"
	}, {
		name: "Riverside Hospital",
		department: "Orthopedics",
		address: "789 Pine St, Columbus, OH",
		phone: "(614) 555-0198"
	},
];

export default function SearchResultsScreen() {
	const [selectedHospital, setSelectedHospital] = useState < Hospital | null > (null);
	const [modalVisible, setModalVisible] = useState(false);

	const handlePress = (hospital : any) => {
		setSelectedHospital(hospital);
		setModalVisible(true);
	};

	return (
		<SafeAreaView style={
			styles.container
		}>
			<Text style={
				styles.header
			}>Search Results</Text>

			<FlatList data={hospitalData}
				keyExtractor={
					(item) => item.name
				}
				renderItem={
					({item}) => (
						<TouchableOpacity style={
								styles.card
							}
							onPress={
								() => handlePress(item)
						}>
							<Text style={
								styles.name
							}>
								{
								item.name
							}</Text>
							<Text style={
								styles.department
							}>
								{
								item.department
							}</Text>
							<Text style={
								styles.info
							}>
								{
								item.address
							}</Text>
							<Text style={
								styles.info
							}>
								{
								item.phone
							}</Text>
						</TouchableOpacity>
					)
				}/> {/* 모달창 */}
			<Modal visible={modalVisible}
				transparent
				animationType="slide">
				<View style={
					styles.modalOverlay
				}>
					<View style={
						styles.modalContent
					}>
						{
						selectedHospital && (
							<>
								<Text style={
									styles.modalTitle
								}>
									{
									selectedHospital.name
								}</Text>
								<Text>{
									selectedHospital.department
								}</Text>
								<Text>{
									selectedHospital.address
								}</Text>
								<Text>{
									selectedHospital.phone
								}</Text>
							</>
						)
					}
						<TouchableOpacity style={
								styles.closeButton
							}
							onPress={
								() => setModalVisible(false)
						}>
							<Text style={
								{
									color: "white",
									textAlign: "center"
								}
							}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fefefe",
		paddingTop: 50,
		paddingHorizontal: 20
	},
	header: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20
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
			height: 2
		},
		shadowRadius: 6
	},
	name: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#072c2c"
	},
	department: {
		fontSize: 16,
		marginTop: 4,
		color: "#333"
	},
	info: {
		marginTop: 2,
		color: "#444"
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.3)",
		justifyContent: "center",
		alignItems: "center"
	},
	modalContent: {
		backgroundColor: "white",
		padding: 25,
		borderRadius: 16,
		width: "80%",
		alignItems: "center"
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15
	},
	closeButton: {
		marginTop: 20,
		backgroundColor: "#007AFF",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10
	}
});
