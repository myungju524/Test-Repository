import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

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
async function getData(collectionName, option) {
  const { field, condition, value } = option;
  const collect = collection(db, collectionName);
  const q = query(collect, where(field, condition, value));
  const snapshot = await getDocs(q);
  // const resultData = snapshot.docs.map(doc=>({
  //   docId : doc.id,
  //   ...doc.data()
  // }))
  // 위처럼 하면 배열로 반환됨(map 함수를 사용했기 때문에) . 배열에 한 객체만 들어있음
  // return resultData[0] 를 써줘야함
  const resultData = { ...snapshot.docs[0].data(), docId: snapshot.docs[0].id };
  return resultData;
}

async function getMember(values) {
  const { email, password } = values;
  const collect = collection(db, "member");
  const q = query(collect, where("email", "==", email));
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  let message;
  let memberObj = {};
  if (docs.length == 0) {
    message = "이메일이 올바르지 않습니다.";
  } else {
    const memberData = { ...docs[0].data(), docId: docs[0].id };
    if (password === memberData.password) {
      message = "로그인에 성공했습니다.";
      memberObj = {
        email: memberData.email,
        docId: memberData.docId,
      };
    } else {
      message = "비밀번호가 일치하지 않습니다.";
    }
  }
  return { memberObj, message };
}
export { getDatas, getData, getMember };
