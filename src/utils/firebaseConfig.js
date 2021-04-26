import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBplrPGjVgb6RDJ7ezfWYD_ODg9KtKi9CY",
    authDomain: "prog4pro.firebaseapp.com",
    
    databaseURL: "https://prog4pro-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "prog4pro",
    storageBucket: "prog4pro.appspot.com",
    messagingSenderId: "7938705232",
    appId: "1:7938705232:web:6f7c4d0266f38b801e4e55"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;