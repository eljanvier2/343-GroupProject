// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

console.log("Firebase API Key:", process.env.FIREBASE_API_KEY);
console.log("Firebase Auth Domain:", process.env.FIREBASE_AUTH_DOMAIN);
console.log("Firebase Project ID:", process.env.FIREBASE_PROJECT_ID);
console.log("Firebase Storage Bucket:", process.env.FIREBASE_STORAGE_BUCKET);
console.log("Firebase Messaging Sender ID:", process.env.FIREBASE_MESSAGING_SENDER_ID);
console.log("Firebase App ID:", process.env.FIREBASE_APP_ID);
console.log("Firebase Measurement ID:", process.env.FIREBASE_MEASUREMENT_ID);

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null; // Analytics only works in the browser

// Export Firebase services
export { auth, analytics };
export default app;
