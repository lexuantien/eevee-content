import { initializeApp } from "firebase/app";
import {
  getFirestore,
  DocumentData,
  CollectionReference,
  collection,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe1IjMhN6xl4GAcfw4fmMTY8w2keIucI4",
  authDomain: "poro-e8728.firebaseapp.com",
  projectId: "poro-e8728",
  storageBucket: "poro-e8728.appspot.com",
  messagingSenderId: "48636361354",
  appId: "1:48636361354:web:8c6362459fa7f2f6e6cb73",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export firestore incase we need to access it directly
export const firestore = getFirestore(app);

//

// This is just a helper to add the type to the db responses
export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};
