import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCtWDThcMZnrKGFbbAYkKd22yRR9bVovzQ',
    authDomain: 'zenapp-df212.firebaseapp.com',
    projectId: 'zenapp-df212',
    storageBucket: 'zenapp-df212.appspot.com',
    messagingSenderId: '464749753128',
    appId: '1:464749753128:android:004800df7eb4c11fb8961d',
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
