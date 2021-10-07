import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "@lib/utils/myFirebase";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser = formatAuthUser(authState);
    setUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setUser(null);
    setLoading(false);
  };

  const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const createUserWithEmail = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const logout = () => signOut(firebaseAuth).then(clear);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  const loginWithGithub = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(firebaseAuth, githubProvider);
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    loginWithEmail,
    createUserWithEmail,
    logout,
    loginWithGoogle,
    loginWithGithub,
  };
}
