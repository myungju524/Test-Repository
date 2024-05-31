import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
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

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);

  return snapshot;
}
async function addDatas(collectionName, dataObj) {
  // 문서 ID 수동

  try {
    // const saveDoc = await doc(db, collectionName, "2");
    // console.log(`doc()결과 :${saveDoc}`);
    // const saveResult = await setDoc(saveDoc, dataObj);
    // console.log(`setDoc( 결과 :${saveResult})`);
    // return true;

    // 문서 ID 자동
    const collect = await collection(db, collectionName);
    await addDoc(collect, dataObj);
    return true;
  } catch (error) {
    return false;
  }
}
export { db, getDatas, addDatas };
