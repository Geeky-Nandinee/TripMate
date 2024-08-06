import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjKfl2U3csoqdc3rP8wQrMz0-5vSQ-DoI",
  authDomain: "tripmate-de769.firebaseapp.com",
  projectId: "tripmate-de769",
  storageBucket: "tripmate-de769.appspot.com",
  messagingSenderId: "195879731574",
  appId: "1:195879731574:web:62008bf31196c0c2b9fa57"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

 

