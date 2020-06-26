import firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyBVlJIKy_FZk53_utNO1ow9e_qj2DWGD5U',
  authDomain: 'triviaapp-338e9.firebaseapp.com',
  databaseURL: 'triviaapp-338e9.firebaseapp.com',
  projectId: 'triviaapp-338e9',
  storageBucket: 'triviaapp-338e9.appspot.com',
  messagingSenderId: '265703670573',
};

let app = firebase.initializeApp(config);
export const db = app.database();
