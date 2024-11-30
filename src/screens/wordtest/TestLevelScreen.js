import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore"; // Firestore 메서드
import { db } from "../../../firebaseConfig"; // Firebase 설정 가져오기

const TestLevelScreen = ({ route }) => {
  const { title, collection: collectionName } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [wordChunks, setWordChunks] = useState([]);

  // 단어를 20개씩 나누는 함수
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // Firebase에서 단어 가져오기
  const fetchWords = async () => {
    if (!collectionName) {
      console.error("컬렉션 이름이 비어 있습니다.");
      setLoading(false);
      return;
    }
    try {
      console.log("Fetching collection:", collectionName);
      const querySnapshot = await getDocs(collection(db, collectionName));
      const words = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWordChunks(chunkArray(words, 20));
    } catch (error) {
      console.error("단어 가져오기 오류:", error);
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

  return (
    <LinearGradient colors={["#5A20BB", "#7F9DFF"]} style={styles.container}>
      <FlatList
        data={wordChunks}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("TestingScreen", {
                title: title,
                level: `챕터 ${index + 1}`,
                words: item,
              })
            }
          >
            <LinearGradient
              colors={["#FFFEE3", "#FFFD9E"]}
              style={styles.cardGradientBackground}
            >
              <Text style={styles.cardTitle}>{`챕터 ${index + 1}`}</Text>
              <Text style={styles.progress}>{`단어 개수: ${item.length}`}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => index.toString()}
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
  card: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
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
