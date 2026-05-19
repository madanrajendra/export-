// .env.local example
/*
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
*/

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDC7XysZimejx66GExLrFArgJeLZiC7c54",
  authDomain: "jellies-monitoring.firebaseapp.com",
  databaseURL: "https://jellies-monitoring-default-rtdb.firebaseio.com",
  projectId: "jellies-monitoring",
  storageBucket: "jellies-monitoring.firebasestorage.app",
  messagingSenderId: "9203948874",
  appId: "1:9203948874:web:f3754b215e3215d9fcb5b3",
  measurementId: "G-58EX9MG8EF"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
