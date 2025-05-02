import { Pressable, Text, View } from 'react-native';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics, isSupported } from "firebase/analytics";
// import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
// @ts-ignore
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
// @ts-ignore
// import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "../firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized", app);

// Initialize Firebase services with proper persistence for React Native
// Use a singleton pattern to prevent multiple initializations during hot reloads
console.log("Initializing Firebase services...");
let auth;

// Check if auth is already initialized in this instance to prevent re-initialization during hot-reloads
if (!global.firebaseAuthInitialized) {
  try {
    // const storage = getReactNativePersistence(AsyncStorage)
    console.log("trying to initialize auth with persistence", getReactNativePersistence);
    console.log("trying to initialize auth with persistence", app);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
    console.log("Firebase auth initialized with React Native persistence");
    // Mark as initialized to prevent multiple initializations
    global.firebaseAuthInitialized = true;
    global.firebaseAuth = auth;
  } catch (error) {
    console.log("Failed to initialize auth with persistence:", error);
    // Fallback to standard auth
    console.log("Using standard auth as fallback");
  }
} else {
  // Use the already initialized auth instance
  auth = global.firebaseAuth || getAuth(app);
}

export default function HomeScreen() {



  // const functions = getFunctions(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: "100%", backgroundColor: "#f09" }}>
      <Pressable onPress={() => {
        console.log("Firebase app initialized", app);
        console.log("Firebase auth initialized", auth);
        console.log("Firebase firestore initialized", firestore);
        console.log("Firebase storage initialized", storage);

        const docRef = doc(firestore, 'users', "test");
        setDoc(docRef, {
          first: "Ada22233",
          last: "Lovelace",
          born: 1815
        }).then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        }).catch((error) => {
          console.error("Error adding document: ", error);
        });
      }}><Text style={{ color: "#fff" }}>Test</Text></Pressable>
    </View>
  );
}
