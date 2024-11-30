import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const categories = [
  {
    id: "1",
    title: "초등 영단어",
    collection: "elementary_words",
    progress: 12,
    total: 200,
  },
  {
    id: "2",
    title: "수능 영단어",
    collection: "sat_words",
    progress: 37,
    total: 200,
  },
  {
    id: "3",
    title: "토익 영단어",
    collection: "toeic_words",
    progress: 0,
    total: 200,
  },
];

const StudyLevelScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#5A20BB", "#7F9DFF"]}>
        <Text style={styles.header}>121일 연속 학습 중 입니다!</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("RealStudyScreen", {
                  title: item.title,
                  collection: item.collection, // Firestore 컬렉션 이름 전달
                })
              }
            >
              <LinearGradient
                colors={["#FAA2FF", "#FDE3FF"]}
                style={styles.cardGradientBackground}
              >
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.goal}>
                  학습률 {item.progress}/{item.total}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0 },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
    marginTop: 30,
    marginBottom: 2,
    marginLeft: 20,
  },
  card: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    height: 201,
  },
  cardGradientBackground: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
  },
  cardTitle: {
    fontSize: 25,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
  goal: { marginLeft: 255, marginTop: 70, fontSize: 14 },
});

export default StudyLevelScreen;
