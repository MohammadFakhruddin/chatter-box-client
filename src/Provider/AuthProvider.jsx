import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firebase.config";
import axios from "axios";

// ✅ Always include cookies in Axios requests
axios.defaults.withCredentials = true;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // 🔐 Google Sign-In
  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;

      // 🔐 Get JWT via cookie
      await axios.post("https://chatter-box-server-three.vercel.app/jwt", {
        email: loggedInUser.email,
      });

      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      console.error("Google sign-in error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Email/Password Sign-In
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = result.user;

      // 🔐 Get JWT via cookie
      await axios.post("https://chatter-box-server-three.vercel.app/jwt", {
        email: loggedInUser.email,
      });

      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      console.error("Email sign-in error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🆕 Create user (Sign-Up)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✏️ Update profile
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // 🚪 Log out
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      await axios.post("https://chatter-box-server-three.vercel.app/logout"); // ✅ Clear JWT cookie
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 👁️ Monitor user auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    logOut,
    signIn,
    googleSignIn,
    loading,
    setLoading,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
