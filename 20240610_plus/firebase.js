const firebaseConfig = {
  apiKey: "AIzaSyC_lfY-x8ZU_A2ScDc7pnwp5ij2jOcNXCI",
  authDomain: "myproject-55608.firebaseapp.com",
  projectId: "myproject-55608",
  storageBucket: "myproject-55608.appspot.com",
  messagingSenderId: "1028203633700",
  appId: "1:1028203633700:web:a8da40205cd845736a8cb1",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function getDatas(collectionName) {
  const querySnapshot = await db.collection(collectionName).get();
  return querySnapshot;
}

async function addDatas(collectionName, addObj) {
  const result = await db.collection(collectionName).add(addObj);
  return result;
}

async function deleteDatas(collectionName, docId) {
  try {
    await db.collection(collectionName).doc(docId).delete();
    return true;
  } catch (error) {
    return false;
  }
}
async function updateDatas(collectionName, docId, updateObj) {
  await db.collection(collectionName).doc(docId).update(updateObj);
}
