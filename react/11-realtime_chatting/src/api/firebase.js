import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvImyje4X6xbO5_UJ6eEdV6ayvFujK-Sw",
  authDomain: "chatting-384c7.firebaseapp.com",
  projectId: "chatting-384c7",
  storageBucket: "chatting-384c7.appspot.com",
  messagingSenderId: "199932424162",
  appId: "1:199932424162:web:8099273973e9974a6c53bb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function getUserAuth() {
  return auth;
}

export { getUserAuth };
