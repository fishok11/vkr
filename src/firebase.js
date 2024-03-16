// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCHjEp37uuA31JNqDyfylxTDkijmUwLKgI',
  authDomain: 'vkrdb-6533e.firebaseapp.com',
  projectId: 'vkrdb-6533e',
  storageBucket: 'vkrdb-6533e.appspot.com',
  messagingSenderId: '67392374213',
  appId: '1:67392374213:web:3e347a5048af98dff577ac',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true, merge: true };
db.settings(settings);

// Enable experimentalForceLongPolling for Firestore
// const firestoreConfig = {
//   experimentalForceLongPolling: true,
// };

// const firestore = firebase.firestore(firebase.app());
// firestore.settings(firestoreConfig);

export default db;
