import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
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
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGNjpyeWwD8-9u4N7QLYUUCK2yulIy2dQ",
  authDomain: "mbti-project-70e6a.firebaseapp.com",
  projectId: "mbti-project-70e6a",
  storageBucket: "mbti-project-70e6a.appspot.com",
  messagingSenderId: "109637991791",
  appId: "1:109637991791:web:d5998546d775cb8d8f7c9a",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);

  return snapshot;
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
