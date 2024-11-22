// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Auth 사용
import { getFirestore } from "firebase/firestore"; // Firestore 사용

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCL6O00KrkHVrLCd-BbwiUMVH-abauisw",
  authDomain: "runtheword-3c913.firebaseapp.com",
  projectId: "runtheword-3c913",
  storageBucket: "runtheword-3c913.appspot.com",
  messagingSenderId: "354101005712",
  appId: "1:354101005712:web:dede8bcb5b2b6b997b3715",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app); // Auth 인스턴스 생성
const db = getFirestore(app); // Firestore 인스턴스 생성

export { auth, db };
