// File: src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFkr18_GApnv1xP8kFDldVGhuJ6_xBCcU",
  authDomain: "citinexus.firebaseapp.com",
  projectId: "citinexus",
  storageBucket: "citinexus.appspot.com",
  messagingSenderId: "403203652433",
  appId: "1:403203652433:web:be449549afa59a11933170",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
