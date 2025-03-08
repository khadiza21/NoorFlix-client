
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBXla1Hn1cY6BCCJqAnf2iy2ak4eW18mYY",
  authDomain: "noorflix-bk.firebaseapp.com",
  projectId: "noorflix-bk",
  storageBucket: "noorflix-bk.firebasestorage.app",
  messagingSenderId: "812875649419",
  appId: "1:812875649419:web:e36aa4945f31878278df8e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;