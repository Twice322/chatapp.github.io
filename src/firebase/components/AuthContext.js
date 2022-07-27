import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { uploadFileToStorage, updateOnlineStatus } from "../../api";
import { message } from "antd";
import { errorMessage } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/slices/user";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user && dispatch(fetchUserData(user));
    });
    if (user) {
      updateOnlineStatus(user.uid, user.metadata.lastLoginAt);
    }
    return () => unsubscribe();
  }, [user]);
  async function logout() {
    dispatch(fetchUserData(null));
    return await auth.signOut();
  }

  async function register(email, password, username, avatarUrl) {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const avatar = avatarUrl
      ? await uploadFileToStorage(avatarUrl, response.user.uid)
      : null;

    await setDoc(doc(db, "users", response.user.uid), {
      email,
      username,
      avatar,
      id: response.user.uid,
      lastSeen: new Date().getTime(),
    });
  }
  async function login(email, password) {
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        return await signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        message.destroy();
        message.error(errorMessage(error.code.split("/")[1]));
      });
  }

  const value = { user, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
