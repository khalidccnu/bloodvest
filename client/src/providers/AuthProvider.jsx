import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase.config.js";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = async (userId, values) => {
    if (values.phone) {
      values.phone = "+880" + values.phone;
      delete values.password;
    }

    return await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
      _id: userId,
      ...values,
      isAdmin: false,
    });
  };

  const signInWithEP = async (email, password) => {
    setLoading(true);

    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async (_) => {
    setLoading(true);

    return await signInWithPopup(auth, googleProvider).then((userCred) =>
      createUser(userCred.user.uid, {
        email: userCred.user.email,
        firstName: userCred.user.displayName,
        photo: userCred.user.photoURL,
      })
    );
  };

  const createUserWithEP = async (values) => {
    setLoading(true);
    const { email, password } = values;

    return await createUserWithEmailAndPassword(auth, email, password).then(
      (userCred) => createUser(userCred.user.uid, values)
    );
  };

  const logOut = async (_) => await signOut(auth);

  const authInfo = {
    isLoading,
    setLoading,
    user,
    signInWithEP,
    signInWithGoogle,
    createUserWithEP,
    logOut,
  };

  useEffect(() => {
    const authChange = onAuthStateChanged(auth, async (userCred) => {
      if (userCred) {
        setUser(userCred);

        await axios
          .post(`${import.meta.env.VITE_API_URL}/jwt`, { _id: userCred.uid })
          .then((response) => localStorage.setItem("_at", response.data))
          .then((_) => sessionStorage.setItem("_vu", JSON.stringify(true)));
      } else {
        setUser(null);
        localStorage.removeItem("_at");
      }

      setLoading(false);
    });

    return () => authChange();
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
