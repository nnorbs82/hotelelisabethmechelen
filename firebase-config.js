// Firebase Configuration for Hotel Elisabeth Mechelen
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Note: It is safe and expected for the Firebase API key to be in source code.
// This is a client-side API key designed to be public. Security is enforced
// through Firebase Security Rules, not by hiding these configuration values.
const firebaseConfig = {
  apiKey: "AIzaSyAn-iGtS-XuP4-mEZjq1R-5ms3LkhRuzf8",
  authDomain: "hotelelisabethmechelen-9dd98.firebaseapp.com",
  databaseURL: "https://hotelelisabethmechelen-9dd98-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hotelelisabethmechelen-9dd98",
  storageBucket: "hotelelisabethmechelen-9dd98.firebasestorage.app",
  messagingSenderId: "201071640171",
  appId: "1:201071640171:web:8d5964d0eaff32ba823b2e",
  measurementId: "G-7FGWKLZ3GX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { app, analytics, auth, database, storage };
