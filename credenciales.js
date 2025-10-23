// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYVW9MMH9y2Zxi0225smVhgTiSPxJBBig",
  authDomain: "gestor-tareas-7b9ee.firebaseapp.com",
  projectId: "gestor-tareas-7b9ee",
  storageBucket: "gestor-tareas-7b9ee.firebasestorage.app",
  messagingSenderId: "471693678210",
  appId: "1:471693678210:web:4db4111d9105fd1669469b"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase
