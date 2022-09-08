import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

interface fireConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  }


const firebaseConfig: fireConfig  = {
    apiKey: "AIzaSyBxCPV_OcRLt2pnPtC1p77l3i0PHcC6u_0",
    authDomain: "utchat-91b17.firebaseapp.com",
    projectId: "utchat-91b17",
    storageBucket: "utchat-91b17.appspot.com",
    messagingSenderId: "1000651706507",
    appId: "1:1000651706507:web:ca51e3d1eb6d334c59848e",
    measurementId: "G-DK08EV963B"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth(app)

export {db, auth};

