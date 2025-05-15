// components/CustomModal.tsx
import React from "react";
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function CustomModal({ visible, onClose, children }: CustomModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.modalScrollContent}>
            {children}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={{ color: "white", textAlign: "center" }}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    paddingVertical: 40,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 16,
    width: "85%",
    minHeight: 250,
    maxHeight: SCREEN_HEIGHT * 0.85,
  },
  modalScrollContent: {
    alignItems: "center",
    paddingBottom: 40,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
