// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';

// import { getFirestore } from 'firebase/firestore';

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// export const firebaseConfig = {
//     apiKey: "AIzaSyBFiQGBZfHre2Kt5Kr5URpBBk6gVSQHgTk",
//     authDomain: "cashrk-20bc7.firebaseapp.com",
//     projectId: "cashrk-20bc7",
//     storageBucket: "cashrk-20bc7.appspot.com",
//     messagingSenderId: "15948754840",
//     appId: "1:15948754840:web:19585a84ae0537ef0c05ed"
// };

// // Initialize Firebase
// // const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);
// // Use these for db & auth
// // const db = firebaseApp.firestore();
// const db = firebase.firestore();
// const auth = firebase.auth();
// // const fs = getFirestore(firebaseConfig);

// // Initialize Firebase


// export const storage = firebase.storage();
// export default {
//     db, firebase, auth
// }

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD5GSjNj9i1cwbRsFYrTxoDIZpUfv7aFtc",
  authDomain: "basic-5661a.firebaseapp.com",
  projectId: "basic-5661a",
  storageBucket: "basic-5661a.appspot.com",
  messagingSenderId: "636248179423",
  appId: "1:636248179423:web:3b63a84cb9bad5cd435f6a",
  measurementId: "G-TXGKZPB1MX"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };