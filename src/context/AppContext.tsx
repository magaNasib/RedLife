import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    User,
} from "firebase/auth";

import { auth, db, onAuthStateChanged } from "../firebase";
import {
    query,
    where,
    collection,
    getDocs,
    addDoc,
    onSnapshot,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});
interface AppContextProps {
    children: ReactNode;
}

export interface UserData {
    uid: string;
    name: string;
    providerId: string;
    email: string;
    // Add other properties as needed
}

const AppContext: React.FC<AppContextProps> = ({ children }) => {
    const collectionUsersRef = collection(db, "users");
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData>();

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            const popup = await signInWithPopup(auth, provider);
            const user = popup.user;
            const q = query(collectionUsersRef, where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collectionUsersRef, {
                    uid: user?.uid,
                    name: user?.displayName,
                    email: user?.email,
                    image: user?.photoURL,
                    authProvider: popup?.providerId,
                });
            }
        } catch (err: unknown) {
            alert(err);
            console.log(err);
        }
    };

    const loginWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            alert(err);
            console.log(err);
        }
    };

    const registerWithEmailAndPassword = async (name: string, email: string, password: string): Promise<void> => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collectionUsersRef, {
                uid: user.uid,
                name,
                providerId: "email/password",
                email: user.email,
            });
        } catch (err) {
            alert(err);
            console.log(err);
        }
    };

    const sendPasswordToUser = async (email: string): Promise<void> => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("New password sent to your email");
        } catch (err) {
            alert(err);
            console.log(err);
        }
    };

    const signOutUser = async () => {
        await signOut(auth);
    };

    const userStateChanged = async (): Promise<void> => {
        onAuthStateChanged(auth, async (user: User | null) => {
            if (user) {
                const q = query(collectionUsersRef, where("uid", "==", user?.uid));
                await onSnapshot(q, (snapshot) => {
                    snapshot.docs.forEach((doc) => {
                        const userData = doc.data() as UserData;
                        setUserData(userData);
                    });
                });
                setUser(user);
            } else {
                setUser(null);
                navigate("/login");
            }
        });
    };


    // useEffect(() => {
    //     const fetchData = async () => {
    //         await userStateChanged();

    //         if (user || userData) {
    //             navigate("/");
    //         } else {
    //             navigate("/login");
    //         }
    //     };

    //     fetchData();
    // }, [user, userData]);

    const initialState = {
        signInWithGoogle: signInWithGoogle,
        loginWithEmailAndPassword: loginWithEmailAndPassword,
        registerWithEmailAndPassword: registerWithEmailAndPassword,
        sendPasswordToUser: sendPasswordToUser,
        signOutUser: signOutUser,
        user: user,
        userData: userData,
    };

    return (
        <div>
            <AuthContext.Provider value={initialState}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AppContext;
