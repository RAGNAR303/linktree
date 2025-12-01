import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
 apiKey: "AIzaSyBMSXroV5MfHicVAERTgmcsk1XtVeOZ30g",
  authDomain: "react-liks.firebaseapp.com",
  projectId: "react-liks",
  storageBucket: "react-liks.firebasestorage.app",
  messagingSenderId: "686610457222",
  appId: "1:686610457222:web:cb03052c842ef50cf86707",
  measurementId: "G-LTPFXPNPV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}
