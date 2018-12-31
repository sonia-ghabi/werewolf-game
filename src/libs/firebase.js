import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBvE4ufKxBOUBtcvrR2l9TdLvC4DiDknVg",
  authDomain: "soso-werewolf.firebaseapp.com",
  databaseURL: "https://soso-werewolf.firebaseio.com",
  projectId: "soso-werewolf",
  storageBucket: "",
  messagingSenderId: "1033185910593"
};

export default () => firebase.initializeApp(firebaseConfig);