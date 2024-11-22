import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.js"; // Firebase 초기화 설정

// 초등 영단어
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
];

// 수능 영단어
const satWords = [
  { english: "abandon", korean: "포기하다" },
  { english: "abstract", korean: "추상적인" },
  { english: "accelerate", korean: "가속하다" },
  { english: "adapt", korean: "적응하다" },
  { english: "advocate", korean: "옹호하다" },
  { english: "analyze", korean: "분석하다" },
  { english: "apply", korean: "적용하다" },
  { english: "assume", korean: "가정하다" },
  { english: "betray", korean: "배신하다" },
  { english: "conclude", korean: "결론짓다" },
  { english: "conserve", korean: "보존하다" },
  { english: "debate", korean: "토론하다" },
  { english: "dedicate", korean: "헌신하다" },
  { english: "define", korean: "정의하다" },
  { english: "distribute", korean: "분배하다" },
  { english: "elevate", korean: "올리다" },
  { english: "eliminate", korean: "제거하다" },
  { english: "emphasize", korean: "강조하다" },
  { english: "evaluate", korean: "평가하다" },
  { english: "fluctuate", korean: "변동하다" },
  { english: "formulate", korean: "공식화하다" },
  { english: "generate", korean: "생성하다" },
  { english: "hypothesize", korean: "가설을 세우다" },
  { english: "implement", korean: "시행하다" },
  { english: "indicate", korean: "나타내다" },
  { english: "interpret", korean: "해석하다" },
  { english: "investigate", korean: "조사하다" },
  { english: "justify", korean: "정당화하다" },
  { english: "legislate", korean: "법률을 제정하다" },
  { english: "manipulate", korean: "조종하다" },
  { english: "maximize", korean: "최대화하다" },
  { english: "minimize", korean: "최소화하다" },
  { english: "modify", korean: "수정하다" },
  { english: "neglect", korean: "소홀히 하다" },
  { english: "observe", korean: "관찰하다" },
  { english: "organize", korean: "조직하다" },
  { english: "participate", korean: "참여하다" },
  { english: "persuade", korean: "설득하다" },
  { english: "predict", korean: "예측하다" },
  { english: "prohibit", korean: "금지하다" },
  { english: "publish", korean: "출판하다" },
  { english: "quote", korean: "인용하다" },
  { english: "reveal", korean: "드러내다" },
  { english: "specify", korean: "명시하다" },
  { english: "substitute", korean: "대체하다" },
  { english: "synthesize", korean: "합성하다" },
  { english: "transform", korean: "변형하다" },
  { english: "violate", korean: "위반하다" },
  { english: "visualize", korean: "시각화하다" },
];

// 토익 영단어
const toeicWords = [
  { english: "accountant", korean: "회계사" },
  { english: "agenda", korean: "의제" },
  { english: "budget", korean: "예산" },
  { english: "colleague", korean: "동료" },
  { english: "deadline", korean: "마감 기한" },
  { english: "efficiency", korean: "효율성" },
  { english: "facility", korean: "시설" },
  { english: "guarantee", korean: "보증" },
  { english: "interview", korean: "면접" },
  { english: "job", korean: "직업" },
  { english: "knowledge", korean: "지식" },
  { english: "leave", korean: "휴가" },
  { english: "meeting", korean: "회의" },
  { english: "network", korean: "네트워크" },
  { english: "objective", korean: "목표" },
  { english: "proposal", korean: "제안" },
  { english: "qualification", korean: "자격" },
  { english: "recruitment", korean: "채용" },
  { english: "salary", korean: "급여" },
  { english: "task", korean: "업무" },
  { english: "utilize", korean: "활용하다" },
  { english: "venue", korean: "장소" },
  { english: "workshop", korean: "워크숍" },
  { english: "advertisement", korean: "광고" },
  { english: "benefit", korean: "혜택" },
  { english: "contract", korean: "계약" },
  { english: "delivery", korean: "배달" },
  { english: "expense", korean: "비용" },
  { english: "forecast", korean: "예측" },
  { english: "inventory", korean: "재고" },
  { english: "market", korean: "시장" },
  { english: "operation", korean: "운영" },
  { english: "profit", korean: "수익" },
  { english: "quotation", korean: "견적" },
  { english: "retail", korean: "소매" },
  { english: "schedule", korean: "일정" },
  { english: "transaction", korean: "거래" },
  { english: "union", korean: "노조" },
  { english: "vendor", korean: "판매자" },
  { english: "warehouse", korean: "창고" },
  { english: "yield", korean: "산출하다" },
  { english: "analysis", korean: "분석" },
  { english: "branding", korean: "브랜딩" },
  { english: "customer", korean: "고객" },
  { english: "database", korean: "데이터베이스" },
  { english: "logistics", korean: "물류" },
  { english: "management", korean: "경영" },
];

// 특정 컬렉션에 단어 추가 함수
const addWordsToFirestore = async (words, collectionName) => {
  try {
    const wordsCollection = collection(db, collectionName);
    for (const word of words) {
      await addDoc(wordsCollection, word);
      console.log(`단어 추가 완료 (${collectionName}): ${word.english}`);
    }
    console.log(`모든 단어가 Firestore에 저장되었습니다! (${collectionName})`);
  } catch (error) {
    console.error(`단어 추가 중 오류 발생 (${collectionName}):`, error);
  }
};

// 실행 함수
const uploadAllWords = async () => {
  await addWordsToFirestore(elementaryWords, "elementary_words");
  await addWordsToFirestore(satWords, "sat_words");
  await addWordsToFirestore(toeicWords, "toeic_words");
};

// 함수 호출
uploadAllWords();