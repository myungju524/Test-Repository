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
  where,
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

async function getDatas(collectionName, options) {
  const q = query(
    getCollection(collectionName),
    where("title", ">=", options.keyword),
    where("title", "<=", options.keyword + "\uf8ff"),
    // 프리픽스만 검색됨 : 단어 앞에서부터 일치하는 게 있어야지만 검색 됨
    limit(options.limits)
  );
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const resultData = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
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
  const result = await addDoc(getCollection(collectionName), addObj);
  const docSnap = await getDoc(result);
  const resultData = { ...docSnap.data(), docId: docSnap.id };
  return resultData;
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

async function deleteDatas(collectionName, docId, imgUrl) {
  // 스토리지에 있는 이미지를 삭제할 때 필요한 것 ==> 파일명(경로포함) or 파일 url
  // 스토리지 객체 생성
  const storage = getStorage();
  let message;

  try {
    // 삭제할 파일의 참초객체 생성(ref 함수 사용)
    message = "이미지 삭제에 실패했습니다. /n관리자에게 문의하세요.";
    const deleteRef = ref(storage, imgUrl);
    // 파일 삭제
    await deleteObject(deleteRef);

    // 삭제할 문서의 참조객체 생성(doc 함수 사용)
    message = "문서 삭제에 실패했습니다. /n관리자에게 문의하세요.";
    const deleteDocRef = await doc(db, collectionName, docId);
    // 문서  삭제
    await deleteDoc(deleteDocRef);
    return { result: true, message: message };
  } catch (error) {
    return { result: false, message: message };
  }
  // finally : try 코드가 성공하던 실패하던 무조건 실행됨

  // try -catch 구문을 쓰지 않으면 화면상에서 확인을 할 수가 없다.
}

async function updateDatas(collectionName, updateObj, docId, imgUrl) {
  // updateDoc() 함수 사용 doc 참조 객체와 수정할 데이터 객체 필요

  // doc 참조 객체
  const docRef = await doc(db, collectionName, docId);

  // 저장되어있는 시간 관련 필드들의 값이 밀리세컨드로 되어있기 때문에
  // getTime() 함수 사용
  const time = new Date().getTime();

  // 사진 파일을 변경하지 않았을 때
  // imgUrl : null
  if (updateObj.imgUrl === null) {
    // 사진이 변경되지 않았을 때 imgUrl 값이 null 로 넘어오기 때문에
    // 그 상태로 문서를 update 해버리면 imgUrl 값이 null로 바뀐다.
    // 그렇기 때문에 updateObj 에서 imgUrl 프로퍼티를 삭제해준다.
    delete updateObj["imgUrl"];
  } else {
    // 사진 파일을 변경했을 때

    // - 기존 사진 삭제
    const storage = getStorage();
    // getStorage()를 사용해서 storage 객체 생성
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);
    // deleteObject()함수 사용해서 삭제

    // 변경한 사진을 스토리지에 저장
    const url = await uploadImage(createPath("foods/"), updateObj.imgUrl);
    // 스토리지에 저장하고 그 파일의 url을 가져와서 uploadObj의 imgUrl
    // 값을 변경해준다.
    // 왜 변경? ==> 기존 updateObj에 있는 imgUrl은 'File' 객체이고,
    // 우리가 데이터베이스에 저장해야 할 imgUrl은 문자열 url 이기 때문에
    updateObj.imgUrl = url;
  }

  // updatedAt 필드에 넣어줄 시간 데이터를 updateObj에 넣어준다.
  updateObj.updatedAt = time;

  // 문서 필드 데이터 수정
  await updateDoc(docRef, updateObj);
  const docSnap = await getDoc(docRef);
  const resultData = { ...docSnap.data(), docId: docSnap.id };
  return resultData;
}

export {
  getDatas,
  addDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
  deleteDatas,
  updateDatas,
};
