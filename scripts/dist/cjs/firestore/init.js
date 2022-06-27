"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollection = exports.firestore = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
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
const app = app_1.initializeApp(firebaseConfig);
// Export firestore incase we need to access it directly
exports.firestore = firestore_1.getFirestore(app);
//
// This is just a helper to add the type to the db responses
const createCollection = (collectionName) => {
    return firestore_1.collection(exports.firestore, collectionName);
};
exports.createCollection = createCollection;
