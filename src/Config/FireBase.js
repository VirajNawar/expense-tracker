import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';





const config = {
    apiKey: "AIzaSyDIy3Hzb11jqp-PwOadRoHcszNLlOiRklw",
  authDomain: "expense-tracker-1dd2f.firebaseapp.com",
  projectId: "expense-tracker-1dd2f",
  storageBucket: "expense-tracker-1dd2f.appspot.com",
  messagingSenderId: "281482878671",
  appId: "1:281482878671:web:d8d584b6f6e260166ce1ba",
  measurementId: "G-C6ZLT9C3W5"
}

const fire = firebase.initializeApp(config)

// const auth = firebase.auth();


export default fire;
