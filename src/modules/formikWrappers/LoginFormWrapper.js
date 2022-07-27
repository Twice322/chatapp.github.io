import React from "react";
import { Formik } from "formik";
import { useAuth } from "../../firebase/components/AuthContext";
import LoginForm from "../LoginForm/LoginForm";
import validate from "../../utils/validate";
import { message } from "antd";

const LoginFormWrapper = () => {
  const { login } = useAuth();
  
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        validate(true, values, errors);
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        login(values.email, values.password)
          .then(() => {
            setSubmitting(false);
          })
          .catch(() => {
            message.error("Ошибка авторизации");
            setSubmitting(false);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
      }) => (
        <LoginForm
          errors={errors}
          values={values}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </Formik>
  );
};
export default LoginFormWrapper;