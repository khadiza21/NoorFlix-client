import { createContext, useState } from "react";
import auth from "../../firebase/firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider();


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


    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }


    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const signWithGoogle = () => {
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