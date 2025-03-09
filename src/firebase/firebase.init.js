
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyBXla1Hn1cY6BCCJqAnf2iy2ak4eW18mYY",
//   authDomain: "noorflix-bk.firebaseapp.com",
//   projectId: "noorflix-bk",
//   storageBucket: "noorflix-bk.firebasestorage.app",
//   messagingSenderId: "812875649419",
//   appId: "1:812875649419:web:e36aa4945f31878278df8e"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app)
// export default auth;

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
