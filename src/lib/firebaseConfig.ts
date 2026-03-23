import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyDFu5rwUwvO4ZwhHgQMO26T-mTZQE4kitg",
  authDomain: "avidrealto.firebaseapp.com",
  databaseURL: "https://avidrealto-default-rtdb.firebaseio.com",
  projectId: "avidrealto",
  storageBucket: "avidrealto.firebasestorage.app",
  messagingSenderId: "700594004205",
  appId: "1:700594004205:web:6d82bb4b895b54ba856ce4",
};

// Safe initialization (Prevents "Firebase App already exists" error)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export services
export const auth = getAuth(app);
export const db = getDatabase(app);
