import { initializeApp } from "firebase/app";
import { deleteUser, getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA1Ao8-XBHXoqJfAPGWWOJ4k6LQJl0GZGc",
    authDomain: "samrt-link.firebaseapp.com",
    projectId: "samrt-link",
    storageBucket: "samrt-link.appspot.com",
    messagingSenderId: "756514405561",
    appId: "1:756514405561:web:1f689559f88299b896ef68",
    measurementId: "G-KQLR9PDCCQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const exist = getAdditionalUserInfo(result)
        if (exist.isNewUser) {
            alert("not exist")
            deleteUser(result.user)
        }
        return true;
    } catch (err) {
        console.log(err)
    }

};