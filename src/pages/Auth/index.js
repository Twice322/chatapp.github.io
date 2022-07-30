import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/components/AuthContext";
import LoginFormWrapper from "../../modules/formikWrappers/LoginFormWrapper";
import RegisterFormWrapper from "../../modules/formikWrappers/RegisterFormWrapper";
import "./Auth.scss";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      navigate("Chat-App/im");
    }
  }, [user, navigate]);
  return (
    !user &&
    !false && (
      <section className="auth">
        <div className="auth__content">
          <Routes>
            <Route element={<LoginFormWrapper />} path={"Chat-App/"} />
          </Routes>
          <Routes>
            <Route
              element={<RegisterFormWrapper />}
              path={"Chat-App/register"}
            />
          </Routes>
        </div>
      </section>
    )
  );
};

export default Auth;
