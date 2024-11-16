// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlY2BEFv_u5Y_UdhyfoPeYBbUPKPrtviM",
  authDomain: "email-password-auth-71805.firebaseapp.com",
  projectId: "email-password-auth-71805",
  storageBucket: "email-password-auth-71805.firebasestorage.app",
  messagingSenderId: "1009430142993",
  appId: "1:1009430142993:web:deed0b7732af1be83e51b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);