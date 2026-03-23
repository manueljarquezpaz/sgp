import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyAM1vRKMoq3nrIN8Mk26zk5SBh1CuHyjbo",
  authDomain: "asiarabstarz.firebaseapp.com",
  databaseURL: "https://asiarabstarz-default-rtdb.firebaseio.com",
  projectId: "asiarabstarz",
  storageBucket: "asiarabstarz.firebasestorage.app",
  messagingSenderId: "852448790687",
  appId: "1:852448790687:web:2c08137a0f2d5adb26baaa",
  measurementId: "G-0S0784LNNH"
};

// Safe initialization (Prevents "Firebase App already exists" error)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export services
export const auth = getAuth(app);
export const db = getDatabase(app);
