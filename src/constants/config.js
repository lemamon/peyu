import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCO-0K33eZs7z3vahOY5dwpD5TYc-KPXr8',
  authDomain: 'peyu-1526050066204.firebaseapp.com',
  databaseURL: 'https://peyu-1526050066204.firebaseio.com',
  projectId:'peyu-1526050066204',
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const db = firebase.firestore();
export const loc = db.collection('locations');
export const firebaseAuth = firebase.auth;