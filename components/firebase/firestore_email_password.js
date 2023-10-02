import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

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


export const storeUserInformation = async (email, password) => {
  try {
    const userDocument = firestore.collection('users').doc(email);

    // Check if the user already exists
    const userSnapshot = await userDocument.get();
    if (userSnapshot.exists) {
      console.log('User already exists in Firestore:', userSnapshot.data());
    } else {
      // Create a new document with the user's email as the document ID
      await userDocument.set({
        email,
        password, // Note: storing passwords directly in Firestore is not recommended for security reasons.
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      console.log('User information stored in Firestore:', { email, password });
    }
  } catch (error) {
    console.error('Error storing user information:', error);
  }
};