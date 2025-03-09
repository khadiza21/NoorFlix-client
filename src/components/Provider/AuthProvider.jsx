import { createContext, useEffect, useState } from "react";
import auth from "../../../firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    const createUser = async (email, password, photoURL, name) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser(user);
            await updateProfile(user, {
                photoURL: photoURL,
                displayName: name,
            });
            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            if (error.code === 'auth/email-already-in-use') {
                throw new Error('This email is already in use. Please try another one.');
            } else {
                throw new Error('An error occurred while creating the user. Please try again later.');
            }
        } finally {
            setLoading(false)
        }

    }


    const signInUser = async (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }


    const signOutUser = async () => {
        setLoading(true)
        return signOut(auth).finally(() => setLoading(false));
      
    }

    const signWithGoogle = async () => {
         return signInWithPopup(auth, provider);
    }


    const userInfo = {
        setUser,
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        signWithGoogle,
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;