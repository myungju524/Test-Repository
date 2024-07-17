import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCI1vsUhHX1BakO5GMyMiFawsibIne2TI0",
  authDomain: "dwos-e7002.firebaseapp.com",
  projectId: "dwos-e7002",
  storageBucket: "dwos-e7002.appspot.com",
  messagingSenderId: "307985457718",
  appId: "1:307985457718:web:bae0e8ad051086122f2e97",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 데이터 가져오기
async function getDatas(collectionName) {
  const collect = collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}
export { getDatas };
