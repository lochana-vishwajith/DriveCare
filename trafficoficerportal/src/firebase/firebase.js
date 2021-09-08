import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtzN8ijPDLkfc3OnVU94Vm4I7OndplqEA",
  authDomain: "drivecare-466b1.firebaseapp.com",
  projectId: "drivecare-466b1",
  storageBucket: "drivecare-466b1.appspot.com",
  messagingSenderId: "861556125144",
  appId: "1:861556125144:web:493b0edb4cc8531ad516ad",
  measurementId: "G-6WWVZXC0P1",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
