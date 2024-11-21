// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Auth 사용
// Import other Firebase services as needed (e.g., Firestore, Storage)

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCL6O00KrkHVrLCd-BbwiUMVH-abauisw",
  authDomain: "runtheword-3c913.firebaseapp.com",
  projectId: "runtheword-3c913",
  storageBucket: "runtheword-3c913.appspot.com", // 수정: `.app` 제거
  messagingSenderId: "354101005712",
  appId: "1:354101005712:web:dede8bcb5b2b6b997b3715",
  measurementId: "G-5NVH3HDQZH", // Analytics는 React Native에서 작동하지 않으므로 제외 가능
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app); // Auth 인스턴스 생성

export { auth };
