import { Button, Text, View } from "react-native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import GoogleSignInButton, { getUserIdNameFromAsyncStorage, } from "@/components/GoogleSignIn";
import { useEffect, useState } from "react";
import AuthSwitch from "@/components/Pages/AuthSwitch";
import Home from "@/components/Pages/Home";
import { UserProvider } from "@/components/Context/UserContext";

// Configure Google Sign-In with your webClientId for iOS
GoogleSignin.configure({
  webClientId: '291215475883-qauh32tjga2qlive148kt17nrrq8efmc.apps.googleusercontent.com',
});

export default function Index() {

  return (
      <>
        <UserProvider>
          <Home />
        </UserProvider>
      </>
  )
}