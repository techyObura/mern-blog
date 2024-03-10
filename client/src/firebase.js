// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ec727.firebaseapp.com",
  projectId: "mern-blog-ec727",
  storageBucket: "mern-blog-ec727.appspot.com",
  messagingSenderId: "253433889347",
  appId: "1:253433889347:web:72ae095f1e3fda490a0af6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
