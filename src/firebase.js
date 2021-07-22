import firebase from 'firebase';

const firebaseApp= firebase.initializeApp({
    apiKey: "AIzaSyCSVmWF_Lc1VTzcAztTQzRcRuZP73IMyN0",
    authDomain: "todo-list-13c01.firebaseapp.com",
    projectId: "todo-list-13c01",
    storageBucket: "todo-list-13c01.appspot.com",
    messagingSenderId: "88850240644",
    appId: "1:88850240644:web:09e7edf5c7844b8de89ed1"
})

const db = firebase.firestore()

export default db;