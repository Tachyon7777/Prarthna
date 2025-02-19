import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "proj-25862.firebaseapp.com",
  projectId: "proj-25862",
  storageBucket: "proj-25862.firebasestorage.app",
  messagingSenderId: "583426408815",
  appId: "1:583426408815:web:0feaa6a8bcb8bae768689a"
};
export const app = initializeApp(firebaseConfig);