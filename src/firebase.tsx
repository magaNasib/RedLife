import { initializeApp } from "firebase/app";
import { UserCredential, getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiXSmk6Je7SalmRP3jyj67yNGNzD2iahQ",
  authDomain: "redlife-abb.firebaseapp.com",
  projectId: "redlife-abb",
  storageBucket: "redlife-abb.appspot.com",
  messagingSenderId: "1020896711513",
  appId: "1:1020896711513:web:db5314510696e91bc2f248"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const db = getFirestore(app);

 const auth = getAuth(app);
export { auth, db, onAuthStateChanged };
