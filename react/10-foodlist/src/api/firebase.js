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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAA2XNjgcfVpxSvsQIf9lmj_Cj1oOELjgw",
  authDomain: "movie-pedia2.firebaseapp.com",
  projectId: "movie-pedia2",
  storageBucket: "movie-pedia2.appspot.com",
  messagingSenderId: "273180255896",
  appId: "1:273180255896:web:3ee5913c59af559f1dd2ed",
  measurementId: "G-PYVWLDP14F",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return resultData;
}

async function getDatasByOrder(collectionName, options) {
  const collect = await collection(db, collectionName);
  // const q = query(컬렉션정보, 조건1, 조건2, 조건3...)
  const q = query(collect, orderBy(options.order, "desc"));
  const snapshot = await getDocs(q);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return resultData;
}

function createPath(path) {
  const uuid = crypto.randomUUID();
  return path + uuid;
}

async function addDatas(collectionName, addObj) {
  // 파일 저장 ==> 스토리지의 이미지 url을 addObj의 imgUrl 값으로 변경
  const path = createPath("foods/");
  const url = await uploadImage(path, addObj.imgUrl);
  addObj.imgUrl = url;

  // id 생성
  const lastId = (await getLastIdNum(collectionName, "id")) + 1;
  addObj.id = lastId;

  // 시간 정보 생성
  const time = new Date().getTime();
  addObj.createdAt = time;
  addObj.updatedAt = time;
  // 컬렉션에 저장
  await addDoc(getCollection(collectionName), addObj);
}
async function uploadImage(path, file) {
  const storage = getStorage();
  const imageRef = ref(storage, path);

  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, file);

  // 저장한 File의 url을 받는다.
  const url = await getDownloadURL(imageRef);
  return url;
}

async function getLastIdNum(collectionName, field) {
  const q = query(
    getCollection(collectionName), // collection
    orderBy(field, "desc"), // 정렬할 필드로 내림차순
    limit(1) // 1개만 가져온다.
  );
  const lastDoc = await getDocs(q);
  const lastId = lastDoc.docs[0].data()[field];
  return lastId;
}

async function getDatasByOrderLimit(collectionName, options) {
  const { fieldName, limits } = options;
  let q;
  if (!options.lq) {
    q = query(
      getCollection(collectionName),
      orderBy(fieldName, "desc"),
      limit(limits)
    );
  } else {
    q = query(
      getCollection(collectionName),
      orderBy(fieldName, "desc"),
      startAfter(options.lq),
      limit(limits)
    );
  }

  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const lastQuery = docs[docs.length - 1];
  const resultData = docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return { resultData, lastQuery };
}
export { getDatas, addDatas, getDatasByOrder, getDatasByOrderLimit };
