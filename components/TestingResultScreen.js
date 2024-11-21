import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TestingResultScreen = ({ route }) => {
  const navigation = useNavigation();
  const { finalScore, total, incorrectWords } = route.params;

  return (
    <View style={styles.container}>
      {/* 헤더 영역 */}
      <Text style={styles.headerText}>시험 결과</Text>
      <Text style={styles.scoreText}>
        {finalScore}/{total}
      </Text>

      {/* 틀린 단어 리스트 */}
      <View style={styles.listContainer}>
        <FlatList
          data={incorrectWords}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.wordText}>{item.word}</Text>
              <Text style={styles.meaningText}>{item.meaning}</Text>
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
              index: 1,
              routes: [{ name: "Home" }, { name: "WordTestScreen" }],
            })
          }
        >
          <Text style={styles.buttonText}>틀린 단어 오답노트에 저장하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          }
        >
          <Text style={styles.buttonText}>메인으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6A0DAD", // 배경 보라색
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 48,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
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
    color: "#6A0DAD",
  },
  meaningText: {
    fontSize: 18,
    color: "#333333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#5B00A1",
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

export default TestingResultScreen;
