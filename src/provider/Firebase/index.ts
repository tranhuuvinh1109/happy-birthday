import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, push, ref } from "firebase/database";

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
});

export const firebaseAuth = getAuth(app);

export const db = getDatabase(app);

const addDataToFirebase = async (refPath: string, value: unknown) => {
  const dbRef = ref(db, `data/${refPath}`);

  try {
    await push(dbRef, value);
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

export { addDataToFirebase };

export default app;
