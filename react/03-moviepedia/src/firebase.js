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

async function getDatasByOrderLimit(collectionName, options) {
  const collect = await collection(db, collectionName);
  let q;
  if (options.lq) {
    q = query(
      collect,
      orderBy(options.order, "desc"),
      startAfter(options.lq),
      limit(options.limit)
    );
  } else {
    q = query(collect, orderBy(options.order, "desc"), limit(options.limit));
  }
  // const q = query(컬렉션정보, 조건1, 조건2, 조건3...)

  const snapshot = await getDocs(q);
  const lastQuery = snapshot.docs[snapshot.docs.length - 1];
  console.log(lastQuery);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return { resultData, lastQuery };
}

async function addDatas(collectionName, dataObj) {
  try {
    const uuid = crypto.randomUUID();
    const path = `movie/${uuid}`;
    const url = await uploadImage(path, dataObj.imgUrl);

    dataObj.imgUrl = url;
    // createdAt, updatedAt ==> 현재 날짜 밀리세컨즈로 바꿔서
    const time = new Date().getTime();
    dataObj.createdAt = time;
    dataObj.updatedAt = time;

    // id 필드의 값 ==> 가장 큰 id +1
    const lastId = await getLastNum(collectionName, "id");
    dataObj.id = lastId + 1;

    // 문서 ID 자동
    const collect = await collection(db, collectionName);
    const result = await addDoc(collect, dataObj);
    const docSnap = await getDoc(result); // result => documentReferance

    const resultData = { ...docSnap.data(), docId: docSnap.id };
    console.log(result);
    return resultData;
  } catch (error) {
    return false;
  }
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
async function uploadImage(path, imgFile) {
  // 스토리지 객체 가져오기
  const storage = getStorage();

  // 저장할 이미지 객체 생성
  const imageRef = ref(storage, path);

  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, imgFile);

  // 저장한 File의 url 가져오기
  const url = await getDownloadURL(imageRef);

  return url;
}
async function deleteDatas(collectionName, docId, imgUrl) {
  // 1. 스토리지 객체 가져온다.
  const storage = getStorage();

  try {
    // 2. 스토리지에서 이미지 삭제
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);
    // 3. 컬렉션에서 문서 삭제
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    return false;
  }
}
async function updateDatas(collectionName, dataObj, docId) {
  // console.log(imgUrl);
  const docRef = await doc(db, collectionName, docId);

  // 수정할 데이터 양식 생성 =>  title, content, rating, updatedAt, imgUrl
  const time = new Date().getTime();
  dataObj.updatedAt = time;
  // 사진 파일이 수정되면 => 기존사진 삭제 => 새로운 사진 추가 => url 받아와서 imgUrl 값 셋팅
  if (dataObj.url !== null) {
    // 기존사진 url 가져오기
    const docSnap = await getDoc(docRef);
    const prevImgUrl = docSnap.data().imgUrl;
    // 스토리지에서 기존사진 삭제
    const storage = getStorage();
    const deleteRef = ref(storage, prevImgUrl);
    await deleteObject(deleteRef);

    // 새로운 사진 추가
    const uuid = crypto.randomUUID();
    const path = `movie/${uuid}`;
    const url = await uploadImage(path, dataObj.imgUrl);
    dataObj.imgUrl = url;
  } else {
    // imgUrl 프로퍼티 삭제
    delete dataObj["imgUrl"];
  }

  // 사진 파일이 수정되지 않으면 => 변경데이터만 업데이트
  await updateDoc(docRef, dataObj);
  const updatedData = await getDoc(docRef); //getDocs().docs.map(doc =>{})
  const resultData = { docId: updatedData.id, ...updatedData.data() };
  return resultData;
}
export {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
};
