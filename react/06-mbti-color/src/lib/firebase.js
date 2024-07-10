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
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

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

// 데이터 가져오기
async function getAllDatas(collectionName, order) {
  // order 파라미터는 정렬용
  const collect = collection(db, collectionName);
  // 콜렉션 정보는 collection() 함수 사용
  const q = query(collect, orderBy(order, "desc"));
  // query()함수 사용 / orderBy() 함수 사용해서 정렬 desc : 내림차순 asc : 오름차순
  const querySnapshot = await getDocs(q);
  const resultData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  // => 함수에서 {}를 리턴해주고 싶으면 소괄호로 감싸줘야 한다
  return resultData;
  //   debugger;
}
export { getAllDatas };
