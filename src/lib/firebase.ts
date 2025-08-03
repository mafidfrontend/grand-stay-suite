import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyB8t0qcABQz6HNQqbNH4bA1Vwb2OPaw3aY",
  authDomain: "mehmonxona-31164.firebaseapp.com",
  projectId: "mehmonxona-31164",
  storageBucket: "mehmonxona-31164.firebasestorage.app",
  messagingSenderId: "468038861338",
  appId: "1:468038861338:web:39c4486d16107370ef47a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;