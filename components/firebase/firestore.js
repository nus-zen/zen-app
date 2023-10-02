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
      // Update the existing document with the new information
      await userDocument.update({
        email,
        password, // Note: storing passwords directly in Firestore is not recommended for security reasons.
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      console.log('User information updated in Firestore:', { email, password });
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

export const updateSelectedMood = async (email, selectedMood) => {
  try {
    const userDocument = firestore.collection('users').doc(email);

    // Check if the document exists
    const docSnapshot = await userDocument.get();

    if (docSnapshot.exists) {
      // Document exists, update the selected mood
      await userDocument.set(
        {
          selectedMood: selectedMood,
          moodTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      console.log('Mood updated in Firestore for user:', email);
    } else {
      // Document doesn't exist, create a new one
      await userDocument.set({
        selectedMood: selectedMood,
        moodTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      console.log('New document created in Firestore for user:', email);
    }
  } catch (error) {
    console.error('Error updating mood:', error);
  }
};