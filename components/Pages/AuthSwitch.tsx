import { Text, View, StyleSheet, Button } from 'react-native';
import GoogleSignInButton, { signOut } from '../GoogleSignIn';
import { useEffect } from 'react';
import Home from './Home';

interface AuthSwitchProps {
    user: {
        userID: string | null;
        displayName: string | null;
    };
    setUserInfo: (userInfo: { userID: string | null; displayName: string | null }) => void;
}

const AuthSwitch: React.FC<AuthSwitchProps> = ({ user, setUserInfo }) => {
    const handleSignOut = async () => {
        await signOut();
        setUserInfo({ userID: null, displayName: null }); // Clear user info on sign-out
    };

    // Display GoogleSignInButton if user is not signed in, otherwise show Home and welcome message
    return (
        <View style={styles.container}>
            {!user.userID ? (
                <GoogleSignInButton />
            ) : (
                <>
                    <Text>Welcome back, {user.displayName}!</Text>
                    <Home />
                    <Button title="Sign Out" onPress={handleSignOut} />
                </>
            )}
        </View>
    );
};

export default AuthSwitch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
