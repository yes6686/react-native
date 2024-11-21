// src/components/SettingsScreen.js
import React,{useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";


export default function AlarmSettingsScreen() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate); // 선택한 날짜 업데이트
    if (Platform.OS !== "ios") {
      setShowPicker(false); // iOS가 아닌 경우 Picker를 닫음
    }
  };

  const togglePicker = () => {
    setShowPicker(!showPicker); // Picker 표시/숨김 전환
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>danbi 님, 안녕하세요!</Text>

      {/* 알람 시간 설정 버튼 */}
      <TouchableOpacity onPress={togglePicker} style={styles.timeButton}>
        <Text style={styles.timeButtonText}>
          알람 시간:{" "}
          {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </TouchableOpacity>

      {/* 알람 수신 스위치 */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>알람 수신</Text>
        <TouchableOpacity onPress={() => {}} style={styles.switchButton}>
          <Text style={styles.switchButtonText}>Toggle Alarm</Text>
        </TouchableOpacity>
      </View>

      {/* DateTimePicker 모달 */}
      {showPicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showPicker}
          onRequestClose={togglePicker}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={date}
                mode="time"
                display="spinner"
                onChange={onChange}
                style={{ width: "100%" }}
              />
              <TouchableOpacity
                onPress={togglePicker}
                style={styles.confirmButton}
              >
                <Text style={styles.confirmButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6A0DAD",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  greetingText: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 20,
  },
  timeButton: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  timeButtonText: {
    fontSize: 16,
    color: "#6A0DAD",
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  switchText: {
    fontSize: 16,
    color: "#6A0DAD",
  },
  switchButton: {
    backgroundColor: "#6A0DAD",
    padding: 8,
    borderRadius: 5,
  },
  switchButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: "#6A0DAD",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
