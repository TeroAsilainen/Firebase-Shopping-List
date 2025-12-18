import { initializeApp } from "firebase/app";
import { getFirestore, Firestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy, onSnapshot, doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {

  apiKey: process.env.EXPO_PUBLIC_APIKEY,

  authDomain: process.env.EXPO_PUBLIC_authDomain,

  projectId: process.env.EXPO_PUBLIC_projectId,

  storageBucket: process.env.EXPO_PUBLIC_storageBucket,

  messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,

  appId: process.env.EXPO_PUBLIC_appId

};


const app = initializeApp(firebaseConfig)
const firestore: Firestore = getFirestore(app)

const SHOPPINGLIST: string = 'shoppinglist'

export {
  firestore,
  collection,
  addDoc,
  SHOPPINGLIST,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
  setDoc,
  updateDoc
}