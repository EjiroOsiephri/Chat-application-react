import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXaeR7W_OaiIEAN5o_BPmn8nT0R_-bShc",
  authDomain: "chat-application-bb1d8.firebaseapp.com",
  projectId: "chat-application-bb1d8",
  storageBucket: "chat-application-bb1d8.appspot.com",
  messagingSenderId: "382290047457",
  appId: "1:382290047457:web:7aa2389d399dc6731f62a0",
};

const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
