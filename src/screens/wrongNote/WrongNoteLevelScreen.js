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
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const WrongNoteLevelScreen = ({ route, navigation }) => {
  const { title } = route.params;
  const [loading, setLoading] = useState(true);
  const [wordChunks, setWordChunks] = useState([]);

  const chunkArray = (array, size) => {
    if (!array.length) return [];
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const fetchWords = async () => {
    try {
      const wordCollection = collection(db, `wrong_notes_${title}`);
      const wordSnapshot = await getDocs(wordCollection);
      const words = wordSnapshot.docs.flatMap((doc) => {
        const data = doc.data();
        if (Array.isArray(data.incorrectWords)) {
          return data.incorrectWords.map((word) => ({
            id: doc.id,
            ...word,
          }));
        }
        return [];
      });

      setWordChunks(chunkArray(words, 20));
    } catch (error) {
      console.error("Error fetching wrong words:", error);
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

  if (!wordChunks.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>오답 노트가 비어 있습니다.</Text>
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
              navigation.navigate("WrongTestingScreen", {
                title: title,
                level: `챕터 ${index + 1}`,
                words: item,
                onCorrectAnswer: async (wordId) => {
                  try {
                    await deleteDoc(doc(db, `wrong_notes_${title}`, wordId));
                    setWordChunks((prevChunks) =>
                      prevChunks
                        .map((chunk) =>
                          chunk.filter((word) => word.id !== wordId)
                        )
                        .filter((chunk) => chunk.length > 0)
                    );
                  } catch (error) {
                    console.error("Error removing word from DB:", error);
                  }
                },
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
