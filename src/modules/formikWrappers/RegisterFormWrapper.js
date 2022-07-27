import React, { useState } from "react";
import { Formik } from "formik";
import { useAuth } from "../../firebase/components/AuthContext";
import RegisterForm from "../RegisterForm/RegisterForm";
import validate from "../../utils/validate";
import { message } from "antd";
import WithNavigation from "../../utils/hoc";

const RegisterFormWrapper = ({ navigate }) => {
  const { register } = useAuth();

  const [photoUrl, setPhotoUrl] = useState(null);

  return (
    <Formik
      initialValues={{ email: "", password: "", password_1: "", username: "" }}
      validate={(values) => {
        const errors = {};
        validate(false, values, errors);
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        register(values.email, values.password, values.username, photoUrl)
          .then(() => {
            navigate("/im");
            setSubmitting(false);
          })
          .catch(() => {
            message.destroy();
            message.error("Ошибка регистрации");
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
        <RegisterForm
          errors={errors}
          values={values}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          onSubmit={handleSubmit}
          setPhotoUrl={setPhotoUrl}
        />
      )}
    </Formik>
  );
};
export default WithNavigation(RegisterFormWrapper);