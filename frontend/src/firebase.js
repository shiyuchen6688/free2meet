import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
  
const firebaseConfig = {
    apiKey: "AIzaSyBt9ZOX2BwCj54iWaRiT-CNY0xR__Wa1DU",
    authDomain: "free2meet-cf894.firebaseapp.com",
    projectId: "free2meet-cf894",
    storageBucket: "free2meet-cf894.appspot.com",
    messagingSenderId: "939711891995",
    appId: "1:939711891995:web:c7593fc1625b2281a886be"
  };
  
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export default auth;