import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./utils/config";
import { getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage();

export const auth = getAuth();
