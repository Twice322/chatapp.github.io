import React from 'react';
import Block from '../../components/Block'
import Button from '../../components/Button'
import { Form } from "antd";
import { Link } from "react-router-dom";
import { validateField } from '../../utils/utils';
import FormField from '../../components/FormField'

const LoginForm = ({
    values,
    errors,
    touched,
    handleChange,
    onSubmit,
    handleBlur,
}) => {
    return (
        <div>
            <div className="auth__top">
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <Block>
                <Form className="login-form">
                    <FormField 
                    name="email"
                    placeholder="E-Mail" 
                    type="email"
                    validateFunction={validateField("email", touched, errors)}
                    help={!touched.email ? "" : errors.email}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    /> 
                    <FormField 
                    name="password"
                    placeholder="Введите пароль" 
                    type="password"
                    validateFunction={validateField("password", touched, errors)}
                    help={!touched.password ? "" : errors.password}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    /> 
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit" onClick={onSubmit}>
                            Войти в аккаунт
                        </Button>
                    </Form.Item>
                    <Link className="auth__register-link" to="/register">
                        Зарегистрироваться
                    </Link>
                </Form>
            </Block>
        </div>
    );
};
export default LoginForm;