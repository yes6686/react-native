import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.js"; // ESM에서는 확장자 `.js`를 반드시 추가

const words = [
  { english: "love", korean: "사랑" },
  { english: "ability", korean: "능력" },
  { english: "accept", korean: "수용하다" },
  { english: "ache", korean: "통증" },
  { english: "hesitate", korean: "주저하다" },
  { english: "happy", korean: "행복" },
  { english: "harmony", korean: "조화" },
];

const addWordsToFirestore = async () => {
  try {
    const wordsCollection = collection(db, "words");
    for (const word of words) {
      await addDoc(wordsCollection, word);
      console.log(`단어 추가 완료: ${word.english}`);
    }
    console.log("모든 단어가 Firestore에 저장되었습니다!");
  } catch (error) {
    console.error("단어 추가 중 오류 발생:", error);
  }
};

addWordsToFirestore();
