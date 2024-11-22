import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { collection, getDocs } from "firebase/firestore"; // Firestore 메서드 가져오기
import { db } from "../../../firebaseConfig"; // Firestore 인스턴스 가져오기

export default function RealStudyScreen({ route, navigation }) {
  const { title } = route.params;

  const [data, setData] = useState([]); // Firestore에서 가져온 단어 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [hiddenState, setHiddenState] = useState({}); // 단어 숨김 상태관리

  // Firestore에서 단어 데이터를 가져오는 함수
  const fetchWordsFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "words")); // 'words' 컬렉션에서 데이터 가져오기
      const words = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Firestore 문서 ID
        ...doc.data(), // Firestore 문서 데이터
      }));
      setData(words);

      // 초기 hiddenState 설정 (모든 단어가 보이는 상태)
      const initialHiddenState = words.reduce((acc, item) => {
        acc[item.id] = { english: false, korean: false };
        return acc;
      }, {});
      setHiddenState(initialHiddenState);
    } catch (error) {
      console.error("Firestore 데이터 가져오기 오류:", error);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  // 컴포넌트가 처음 렌더링될 때 Firestore에서 데이터 가져오기
  useEffect(() => {
    fetchWordsFromFirestore();
  }, []);

  // 영어/한글 보이기 전환
  const toggleVisibility = (id, type) => {
    setHiddenState((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [type]: !prevState[id][type], // type은 'english' 또는 'korean'
      },
    }));
  };

  // 단어 렌더링
  const renderItem = ({ item }) => (
    <View style={styles.wordRow}>
      {/* 영어 */}
      <TouchableOpacity
        style={styles.wordBox}
        onPress={() => toggleVisibility(item.id, "english")}
      >
        <Text style={styles.wordText}>
          {hiddenState[item.id]?.english ? "👆" : item.english}
        </Text>
      </TouchableOpacity>

      {/* 한글 */}
      <TouchableOpacity
        style={styles.wordBox}
        onPress={() => toggleVisibility(item.id, "korean")}
      >
        <Text style={styles.wordText}>
          {hiddenState[item.id]?.korean ? "👆" : item.korean}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={["#6A0DAD", "#C299F6"]} style={styles.container}>
      <Text style={styles.headerText}>{title}</Text>

      {/* 로딩 상태 */}
      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFF" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>학습 종료</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 20,
  },
  wordRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  wordBox: {
    flex: 1,
    backgroundColor: "#000",
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  wordText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A0DAD",
  },
});
