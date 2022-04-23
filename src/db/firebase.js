import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, doc, getDoc, getDocs, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence, connectAuthEmulator  } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDaY_M95nQ9Ja7gO1R5juKRHFKHmb_CFfg",
    authDomain: "get-it-done-gamefied.firebaseapp.com",
    projectId: "get-it-done-gamefied",
    storageBucket: "get-it-done-gamefied.appspot.com",
    messagingSenderId: "840739151935",
    appId: "1:840739151935:web:3a196ab36d75397171988a",
    measurementId: "G-1YNPHKL01R"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

const auth = getAuth();
setPersistence(auth, browserSessionPersistence).then(() => {});

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // window.location.reload(false);
//     console.log(auth);
//     console.log("User signed out! state change");
//     console.log("userID = ", localStorage.getItem("userID"))
//   }
// });

// For running local version:
// connectFirestoreEmulator(db, 'localhost', 8080);



/*
Parameter(s):
  document - Path of document (i.e., "users/userID")

Return:
  Returns the document at the given path. Should look like:
  {field1: "Some data", filed2: "Some more data"}

Example:
  firebase.getDocument("users/userID").then((result) => {
    console.log(result);
  })
*/
async function getDocument(document) {
    const docRef = doc(db, document);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return {};
    }
}

/*
Parameter(s):
  col - Path of collection (i.e., "users/" or "users/userID/achievements/")

Return:
  Returns an array of the documents in that collection. Should look like:
  [ {field1: "Some data", filed2: "Some more data"}, {field1: "Test", field2: "Test2"} ]

Example:
  firebase.getCollection("users/").then((result) => {
      console.log(result);
  });
*/
async function getCollection(col) {
    const colRef = collection(db, col);
    const colSnap = await getDocs(colRef);

    let ret = [];
    colSnap.forEach(doc => {
        ret.push( {id: doc.id, ...doc.data()} );
    });
    return ret;
}

/*
Parameter(s):
  col - The path of the document to be added (i.e., "users/" or "users/userID/achievements/")
  data - The data being stored in the document. Should look like:
  {field1: "Some data", field2: "Some more data", field3: 100, field4: True}

Returns:
  Reutrns the id of the document created.

Example:
  firebase.createDocument("users/userID/Achievements/", {achieve: "test"}).then(() => {});
*/
async function createDocument(col, data) {
    const docRef = collection(db, col);
    const docSnap = await addDoc(docRef, data);
    return docSnap.id;
}

/*
Parameter(s):
  document - The path of the document to be changed (i.e., "users/userID")
  data - The data being changed in the document. Should look like:
  {field2: "Stuff"}

Returns:
  Nothing

Example:
  firebase.updateDocument("users/userID", {Name: "My new name"}).then((result) => {});
*/
async function updateDocument(document, data) {
    const docRef = doc(db, document);
    await updateDoc(docRef, data);
}

/*
Parameter(s):
  document - The path of the document to be deleted (i.e., "users/userID")

Returns:
  Nothing

Example:
  firebase.deleteDocument("users/userID").then((result) => {});
*/
async function deleteDocument(document) {
  const docRef = doc(db, document);
  await deleteDoc(docRef);
}

// var uid = null;
// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     // const uid = user.uid;
//     uid = user.uid;
//     console.log("State change, uid = ", uid);
//   } else {
//     // User is signed out
//     uid = null;
//   }
// });

function getUserID() {
  const auth = getAuth();
  return localStorage.getItem("userID");
}


export { getDocument, getCollection, createDocument, updateDocument, deleteDocument, getUserID };