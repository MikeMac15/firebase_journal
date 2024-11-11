import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import GoogleSignInButton, { getUserIdNameFromAsyncStorage, signUserOut } from "../GoogleSignIn";
import { Text, View } from "react-native";

interface User {
    userID: string | null;
    displayName: string | null;
}

interface UserContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>({ userID: null, displayName: null });
    const [isUserSignedIn,setIsUserSignedIn] = useState(false); // Set isLoading to true initially

    useEffect(() => {
        console.log("UserProvider mounted");
        const loadUser = async () => {
            try {
                console.log("Attempting to load user from AsyncStorage...");
                const userInfo = await getUserIdNameFromAsyncStorage();
                if (userInfo) {
                    console.log("User loaded from AsyncStorage:", userInfo);
                    setUser({ userID: userInfo.userID, displayName: userInfo.displayName });
                    setIsUserSignedIn(true);
                } else {
                    console.log("No user found in AsyncStorage");
                }
            } catch (error) {
                console.error("Error loading user from AsyncStorage:", error);
             }
        };
      
            loadUser();
            
     
    }, [isUserSignedIn]);

    useEffect(() => {
        console.log("User state updated:", user);
    }, [user]);

    const signOut = async () => {
        try {
            console.log("Signing out user...");
            await signUserOut();
            setUser({ userID: null, displayName: null });
            setIsUserSignedIn(false);
            console.log("User signed out and state cleared.");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, signOut }}>
            {user.userID && isUserSignedIn ? children : <GoogleSignInButton setIsUserSignedIn={setIsUserSignedIn}/>}
        </UserContext.Provider>
    );
};
