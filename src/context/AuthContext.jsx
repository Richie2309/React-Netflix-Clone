import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth, db } from "../services/firebase";
import { setDoc, doc } from "firebase/firestore";


const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db, 'users', email), {
            favShows: []
        })
    }


    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}
export function UserAuth() {
    return useContext(AuthContext);
}
