// src/components/TestLevelScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

// 초등 영단어 - 단어 불러오기 대신 하드코딩
const elementaryWords = [
  { english: "apple", korean: "사과" },
  { english: "book", korean: "책" },
  { english: "cat", korean: "고양이" },
  { english: "dog", korean: "개" },
  { english: "egg", korean: "달걀" },
  { english: "fish", korean: "물고기" },
  { english: "girl", korean: "소녀" },
  { english: "house", korean: "집" },
  { english: "ice", korean: "얼음" },
  { english: "juice", korean: "주스" },
  { english: "kite", korean: "연" },
  { english: "lemon", korean: "레몬" },
  { english: "monkey", korean: "원숭이" },
  { english: "nose", korean: "코" },
  { english: "orange", korean: "오렌지" },
  { english: "pencil", korean: "연필" },
  { english: "queen", korean: "여왕" },
  { english: "rabbit", korean: "토끼" },
  { english: "sun", korean: "태양" },
  { english: "tree", korean: "나무" },
  { english: "umbrella", korean: "우산" },
  { english: "van", korean: "승합차" },
  { english: "water", korean: "물" },
  { english: "xylophone", korean: "실로폰" },
  { english: "yogurt", korean: "요구르트" },
  { english: "zebra", korean: "얼룩말" },
  { english: "ball", korean: "공" },
  { english: "chair", korean: "의자" },
  { english: "desk", korean: "책상" },
  { english: "eraser", korean: "지우개" },
  { english: "flower", korean: "꽃" },
  { english: "garden", korean: "정원" },
  { english: "hat", korean: "모자" },
  { english: "island", korean: "섬" },
  { english: "jungle", korean: "정글" },
  { english: "king", korean: "왕" },
  { english: "lion", korean: "사자" },
  { english: "mountain", korean: "산" },
  { english: "night", korean: "밤" },
  { english: "ocean", korean: "바다" },
  { english: "pizza", korean: "피자" },
  { english: "queen", korean: "여왕" },
  { english: "rainbow", korean: "무지개" },
  { english: "star", korean: "별" },
  { english: "tiger", korean: "호랑이" },
  { english: "umbrella", korean: "우산" },
  { english: "violin", korean: "바이올린" },
  { english: "whale", korean: "고래" },
  { english: "x-ray", korean: "엑스레이" },
  { english: "yellow", korean: "노란색" },
  { english: "zoo", korean: "동물원" },
  { english: "bus", korean: "버스" },
  { english: "train", korean: "기차" },
  { english: "apple pie", korean: "사과파이" },
  { english: "blue sky", korean: "푸른 하늘" },
  { english: "park", korean: "공원" },
  { english: "road", korean: "길" },
  { english: "school", korean: "학교" },
  { english: "teacher", korean: "선생님" },
  { english: "student", korean: "학생" },
  { english: "cup", korean: "컵" },
  { english: "plate", korean: "접시" },
  { english: "spoon", korean: "숟가락" },
  { english: "fork", korean: "포크" },
  { english: "knife", korean: "칼" },
  { english: "glass", korean: "유리컵" },
  { english: "bottle", korean: "병" },
  { english: "bird", korean: "새" },
  { english: "bear", korean: "곰" },
  { english: "wolf", korean: "늑대" },
];

// 배열을 20개씩 나누는 함수
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const TestLevelScreen = ({ route }) => {
  const { title, collection: collectionName } = route.params;
  const navigation = useNavigation();

  // 단어를 20개씩 나누기
  const wordChunks = chunkArray(elementaryWords, 20);

  // FlatList에 사용할 데이터 형식으로 변환
  const categories = wordChunks.map((chunk, index) => ({
    id: String(index),
    title: title,
    level: `챕터 ${index + 1}`,
    wordCount: `단어 개수: ${chunk.length}`, // 학습률 대신 단어 개수를 표시
    words: chunk,
  }));

  return (
    <LinearGradient
      colors={["#5A20BB", "#7F9DFF"]} // 배경에 그라데이션 적용
      style={styles.container} // container 스타일 사용
    >
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("TestingScreen", {
                title: item.title,
                level: item.level,
                words: item.words, // 단어 데이터 전달
              })
            }
          >
            <LinearGradient
              colors={["#FFFEE3", "#FFFD9E"]}
              style={styles.cardGradientBackground}
            >
              <Text style={styles.cardTitle}>{item.level}</Text>
              <Text style={styles.progress}>{item.wordCount}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6A0DAD", // 배경 색
    padding: 20,
  },
  card: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden", // 카드 모서리를 둥글게 처리
  },
  cardGradientBackground: {
    padding: 15,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  progress: {
    fontSize: 14,
    color: "#333333",
  },
});

export default TestLevelScreen;
