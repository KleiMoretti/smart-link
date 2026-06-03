// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1Ao8-XBHXoqJfAPGWWOJ4k6LQJl0GZGc",
    authDomain: "samrt-link.firebaseapp.com",
    projectId: "samrt-link",
    storageBucket: "samrt-link.firebasestorage.app",
    messagingSenderId: "756514405561",
    appId: "1:756514405561:web:1f689559f88299b896ef68",
    measurementId: "G-KQLR9PDCCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)
    return result;
}
