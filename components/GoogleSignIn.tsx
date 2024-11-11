import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Function to add the user ID and Name to AsyncStorage
async function addUserIdNameToAsyncStorage(userID: string, displayName?:string): Promise<void> {
  try {
    await AsyncStorage.setItem('userID', userID);
    if (displayName)
        await AsyncStorage.setItem('displayName', displayName);
  } catch (error) {
    console.error('AsyncStorage error:', error);
  }
}
async function removeUserIdNameFromAsyncStorage(): Promise<void> {
    try {
        await AsyncStorage.removeItem('userID');
        await AsyncStorage.removeItem('displayName');
    } catch (error) {
        console.error('AsyncStorage error:', error);
    }
    }

export async function signUserOut(): Promise<void> {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await auth().signOut();
        console.log('Signed out successfully');
        await removeUserIdNameFromAsyncStorage();
        console.log('User ID/ displayName removed from AsyncStorage');
    } catch (error) {
        console.error('Sign-out error:', error);
    }
}

// Function to get the user ID from AsyncStorage

export async function getUserIdNameFromAsyncStorage(): Promise<{ userID: string | null; displayName: string | null } | null> {
    try {
        const userID = await AsyncStorage.getItem('userID');
        const displayName = await AsyncStorage.getItem('displayName');
        return { userID, displayName };  // Return as an object
    } catch (error) {
        console.error('AsyncStorage error:', error);
        return null;
    }
}

// Error handling function for sign-in errors
function handleSignInError(error: unknown): void {
  if (error instanceof Error) {
    console.error('Google Sign-In error:', error.message);
    // Optionally, display an alert or other UI feedback
  } else {
    console.error('An unknown error occurred:', error);
  }
}

// Function to handle Google sign-in and add user to Firestore if needed
async function signInWithGoogle(): Promise<void> {
  try {
    // Check if Google Play services are available (for Android) - not needed on iOS
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Sign in with Google
    const userInfo = await GoogleSignin.signIn();
    // Retrieve idToken from getTokens after sign-in
    const { idToken } = await GoogleSignin.getTokens();
    if (!idToken) {
      throw new Error('No ID token found after sign-in.');
    }
    if (!idToken) {
      throw new Error('No ID token found');
    }

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);
    console.log('Signed in with Google!');

    // After sign-in, check if the user exists in Firestore
    const { uid, displayName, email } = userCredential.user;
    const userDoc = firestore().collection('users').doc(uid);

    // Check if the user document exists
    const docSnapshot = await userDoc.get();

    if (!docSnapshot.exists) {
      // Add the user to Firestore if they don't already exist
      await userDoc.set({
        displayName,
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      
      console.log('User added to Firestore!');
    } else {
        await userDoc.update({
            lastLogin: firestore.FieldValue.serverTimestamp(),
        });
        console.log('User exists in Firestore');
    }
    if (!displayName){
        let newDisplayName = generateUsername();
        await addUserIdNameToAsyncStorage(uid, newDisplayName);
    } else {
        await addUserIdNameToAsyncStorage(uid, displayName);
    }
    console.log('User ID added to AsyncStorage');
  } catch (error) {
    handleSignInError(error);
  }
}

// React component for the Google Sign-In button
import React from 'react';
import { Button, Alert } from 'react-native';
import generateUsername from './SignIn/generateUserName';

interface Props {
  setIsUserSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const GoogleSignInButton: React.FC<Props> = ({setIsUserSignedIn}) => {
  const handlePress = async () => {
    try {
      await signInWithGoogle();
      setIsUserSignedIn(true);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Google Sign-In failed', error.message);
      } else {
        Alert.alert('Google Sign-In failed', 'An unknown error occurred');
      }
    }
  };

  return (
    <Button title="Sign in with Google" onPress={handlePress} />
  );
};

export default GoogleSignInButton;

