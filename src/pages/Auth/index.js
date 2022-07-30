import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../../firebase/components/AuthContext";
import LoginFormWrapper from "../../modules/formikWrappers/LoginFormWrapper";
import RegisterFormWrapper from "../../modules/formikWrappers/RegisterFormWrapper";
import "./Auth.scss";

const Auth = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <section className="auth">
      <div className="auth__content">
        <Routes>
          <Route
            element={user ? <Navigate to="/im" /> : <LoginFormWrapper />}
            path={"/"}
          />
        </Routes>
        <Routes>
          <Route element={<RegisterFormWrapper />} path={"/register"} />
        </Routes>
      </div>
    </section>
  );
};

export default Auth;
