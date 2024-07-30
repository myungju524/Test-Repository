import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1dgrmHFlgSm87iSoIHtnMOUuFiAgaLy8",
  authDomain: "chatting2-f73ef.firebaseapp.com",
  projectId: "chatting2-f73ef",
  storageBucket: "chatting2-f73ef.appspot.com",
  messagingSenderId: "1053532568579",
  appId: "1:1053532568579:web:bb23d2b13326ce8c98a236",
  measurementId: "G-QVPCQJ8ZFC",
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

async function addDatas(collectionName, addObj) {
  await addDoc(getCollection(collectionName), addObj);
}

function getRealTimeMessages(collectionName, setData) {
  const collect = collection(db, collectionName);
  const q = query(collect, orderBy("createdAt"), limit(100));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const resultData = snapshot.docs.map((doc) => doc.data());
    setData(resultData);
  });
  return unsubscribe;
}

function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [], limits } = queryOption;
  const collect = getCollection(collectionName);
  let q = query(collect);

  // where 조건
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });
  // orderBy 조건
  orderBys.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || "asc"));

    // limit 조건
  });
  q = query(q, limit(limits));
  return q;
}

export { getUserAuth, addDatas, db, getRealTimeMessages, getQuery };
