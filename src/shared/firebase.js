import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXayZasdmLQL3vnrfwvJRTznD829XnIZI",
  authDomain: "megazine-95aec.firebaseapp.com",
  projectId: "megazine-95aec",
  storageBucket: "megazine-95aec.appspot.com",
  messagingSenderId: "31647374868",
  appId: "1:31647374868:web:6bb0ae68186d51cddf1101",
  measurementId: "G-DTHFL628PF",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage();
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
