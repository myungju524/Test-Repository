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
async function getAllDatas(collectionName, order, lq) {
  // order 파라미터는 정렬용
  const collect = collection(db, collectionName);
  // 콜렉션 정보는 collection() 함수 사용
  let q = query(collect, orderBy(order, "desc"), limit(10));
  if (lq) {
    q = query(collect, orderBy(order, "desc"), startAfter(lq), limit(10));
  }
  // query()함수 사용 / orderBy() 함수 사용해서 정렬 desc : 내림차순 asc : 오름차순
  const querySnapshot = await getDocs(q);
  const lastQuery = querySnapshot.docs[querySnapshot.docs.length - 1];
  const resultData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  // => 함수에서 {}를 리턴해주고 싶으면 소괄호로 감싸줘야 한다
  return { resultData, lastQuery };
  //   debugger;
}

async function addDatas(collectionName, dataObj) {
  const collect = collection(db, collectionName);
  // id 값 생성
  const lastId = (await getLastNum(collectionName, "id")) + 1;
  // 날짜 생성
  const time = new Date().getTime();
  // 추가할 data 객체에 필요한 필드 정보 추가
  dataObj.id = lastId;
  dataObj.createdAt = time;
  dataObj.updatedAt = time;
  // 문서에 data 객체 저장
  const result = await addDoc(collect, dataObj);
  return result;
}
async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

export { getAllDatas, addDatas };
