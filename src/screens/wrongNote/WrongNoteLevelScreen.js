import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const WrongNoteLevelScreen = ({ route, navigation }) => {
  const { title } = route.params; // Category title (e.g., "초등 영단어")
  const [loading, setLoading] = useState(true);
  const [chapters, setChapters] = useState([]); // 챕터별 데이터 저장

  // Firebase에서 데이터 가져오기
  const fetchWords = async () => {
    try {
      const wordCollection = collection(db, `wrong_notes_${title}`);
      const wordSnapshot = await getDocs(wordCollection);

      // 데이터 변환
      const fetchedChapters = wordSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id, // Firestore 문서 ID
          pid: data.pid,
          level: data.level || "Unknown", // 챕터 레벨
          words: data.incorrectWords || [], // 틀린 단어들
          timestamp: data.timestamp?.toDate(), // Firestore Timestamp 변환
        };
      });

      // 최신 순으로 정렬
      const sortedChapters = fetchedChapters.sort((a, b) => {
        if (!a.timestamp || !b.timestamp) return 0; // timestamp가 없으면 변경하지 않음
        return b.timestamp - a.timestamp; // 내림차순 정렬
      });

      setChapters(sortedChapters);
    } catch (error) {
      console.error("오답 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (!chapters.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>오답 노트가 비어 있습니다.</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#5A20BB", "#7F9DFF"]} style={styles.container}>
      <FlatList
        data={chapters}
        renderItem={({ item }) => {
          // 날짜 및 시간 포맷팅
          const formattedDate = item.timestamp
            ? item.timestamp.toLocaleDateString()
            : "Unknown Date";
          const formattedTime = item.timestamp
            ? item.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Unknown Time";

          const isCompleted = item.words.length === 0;

          return (
            <TouchableOpacity
              style={[
                styles.card,
                isCompleted && styles.completedCard, // 통과한 오답 노트에 스타일 추가
              ]}
              onPress={() =>
                !isCompleted &&
                navigation.navigate("WrongTestingScreen", {
                  title,
                  level: item.level, // 선택된 레벨
                  words: item.words.map((word) => ({
                    ...word, // 각 단어에 추가 속성 전달
                  })), // 해당 레벨의 단어들
                  docId: item.id, // Firestore 문서 ID 전달
                  pid: item.pid,
                })
              }
            >
              <LinearGradient
                colors={
                  isCompleted ? ["#B4EC51", "#429321"] : ["#FFFEE3", "#FFFD9E"]
                }
                style={styles.cardGradientBackground}
              >
                <Text style={styles.cardTitle}>
                  {`${formattedDate} ${formattedTime} : ${item.level}`}
                </Text>
                <Text style={styles.progress}>
                  {isCompleted
                    ? "✅ 통과한 테스트"
                    : `단어 개수: ${item.words.length}`}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6A0DAD",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6A0DAD",
  },
  noDataText: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  completedCard: {
    opacity: 0.7, // 통과한 테스트는 흐릿하게 표시
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

export default WrongNoteLevelScreen;
