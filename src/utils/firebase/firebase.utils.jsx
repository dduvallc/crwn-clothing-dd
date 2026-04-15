import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqmLEn0igKL-Qn-BytZ6DBoQAdGJ5_oaQ",
  authDomain: "crwn-clothing-db-10037.firebaseapp.com",
  projectId: "crwn-clothing-db-10037",
  storageBucket: "crwn-clothing-db-10037.firebasestorage.app",
  messagingSenderId: "79883193136",
  appId: "1:79883193136:web:aa3b3b156bb963d97d16f5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//     if (!userAuth) return;
//     console.log(userAuth);
// };

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // if user data does not exist, create / set the document with the data from userAuth, in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
            console.log('I am here');
        
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    };

    return userDocRef;
};