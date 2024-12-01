import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const WrongTestingResultScreen = ({ route, navigation }) => {
  const { title, level, finalScore, total, incorrectWords } = route.params;

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#5A20BB", "#7F9DFF"]} style={styles.header}>
        <Text style={styles.headerText}>{title} 오답 테스트 결과</Text>
      </LinearGradient>

      {/* 점수 표시 */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>
          점수: {finalScore} / {total}
        </Text>
      </View>

      {/* 틀린 단어 리스트 */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>틀린 단어</Text>
        <FlatList
          data={incorrectWords}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.wordText}>{item.english}</Text>
              <Text style={styles.meaningText}>{item.korean}</Text>
            </View>
          )}
        />
      </View>

      {/* 버튼 영역 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "WrongNoteScreen" }], // 오답 노트로 돌아가기
            })
          }
        >
          <Text style={styles.buttonText}>오답 노트로 돌아가기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }], // 메인 화면으로 돌아가기
            })
          }
        >
          <Text style={styles.buttonText}>메인 화면으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  scoreContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  scoreText: {
    fontSize: 30,
    color: "#5A20BB",
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10,
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5A20BB",
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  wordText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  meaningText: {
    fontSize: 18,
    color: "#666666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#5A20BB",
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default WrongTestingResultScreen;
