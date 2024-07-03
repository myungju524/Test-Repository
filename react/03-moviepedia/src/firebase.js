import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcuGAmSg2E0qWghVDIp455j9SPrH8qugc",
  authDomain: "movie-pedia-822bb.firebaseapp.com",
  projectId: "movie-pedia-822bb",
  storageBucket: "movie-pedia-822bb.appspot.com",
  messagingSenderId: "492131575513",
  appId: "1:492131575513:web:19eac772739778831040c8",
  measurementId: "G-YGJT4BBRRY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}
async function addDatas(collectionName, dataObj) {
  try {
    // 문서 ID 수동
    // const saveDoc = await doc(db, collectionName, "2");
    // console.log(`doc()결과 :${saveDoc}`);
    // const saveResult = await setDoc(saveDoc, dataObj);
    // console.log(`setDoc( 결과 :${saveResult})`);
    // return true;

    // 문서 ID 자동
    const collect = await collection(db, collectionName);
    await addDoc(collect, dataObj); // 결과 == undefined
    return true;
  } catch (error) {
    return false;
  }
}

async function deleteDatas(collectionName, docId) {
  const docRef = await doc(db, collectionName, docId);
  await deleteDoc(docRef);
}
async function updateDatas(collectionName, docId, updateInfoObj) {
  // doc(db, 컬렉션명, 문서ID);
  // getDoc(문서래퍼런스);
  // updateDoc(문서데이터, 수정할 정보객체);

  const docRef = await doc(db, collectionName, docId);
  // const docData = await getDoc(docRef);
  updateDoc(docRef, updateInfoObj);
}
export { db, getDatas, addDatas, deleteDatas, updateDatas };
