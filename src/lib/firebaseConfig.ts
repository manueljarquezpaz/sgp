import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyBVAlrgIhpZNRbf5qHteeDrrVY_SJ6QaTI",
  authDomain: "arabnowvote.firebaseapp.com",
  databaseURL: "https://arabnowvote-default-rtdb.firebaseio.com",
  projectId: "arabnowvote",
  storageBucket: "arabnowvote.firebasestorage.app",
  messagingSenderId: "928685991387",
  appId: "1:928685991387:web:6b93b9ba8e77fd5affb3fe"
};

// Safe initialization (Prevents "Firebase App already exists" error)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export services
export const auth = getAuth(app);
export const db = getDatabase(app);
