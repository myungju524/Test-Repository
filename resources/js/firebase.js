import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_lfY-x8ZU_A2ScDc7pnwp5ij2jOcNXCI",
  authDomain: "myproject-55608.firebaseapp.com",
  projectId: "myproject-55608",
  storageBucket: "myproject-55608.appspot.com",
  messagingSenderId: "1028203633700",
  appId: "1:1028203633700:web:a8da40205cd845736a8cb1",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


async function getMembers() {
    const collect = await collection(db, 'member');
    const snapshot = await getDocs(collect);
  
    return snapshot;
  }
  
  export { db, getMembers };