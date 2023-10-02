import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDaWjLqO7duoHVTkpv23t9Esun4CIMeNOk",
  authDomain: "zenapp-df212.firebaseapp.com",
  databaseURL:
    "https://zenapp-df212-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zenapp-df212",
  storageBucket: "zenapp-df212.appspot.com",
  messagingSenderId: "464749753128",
  appId: "1:464749753128:web:a0ac094c8e4ad248b8961d",
  measurementId: "G-CK73YHENCX",
};

let Firebase;
let auth;

try {
  Firebase = initializeApp(firebaseConfig);
  auth = initializeAuth(Firebase, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  if (error.code === "app/duplicate-app") {
    // Firebase is already initialized.
    // You can get the instance using getApp function if needed.
    Firebase = getApps()[0];
    auth = getAuth(Firebase);
  } else {
    console.error("Firebase initialization error", error);
  }
}

export { Firebase, auth };
