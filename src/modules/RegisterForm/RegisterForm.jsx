import React, {useRef, useState } from 'react';
import Block from '../../components/Block'
import { Form} from "antd";
import FormField from '../../components/FormField';
import Button from '../../components/Button';
import { MailOutlined, LockOutlined, UserOutlined  } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import UploadAvatar from '../../components/FormUploadAvatar';
import { validateField } from '../../utils/utils';


const RegisterForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  handleBlur,
  setPhotoUrl
}) => {
    const imageInputRef = useRef();
    
    return (
        <div> 
        <div className="auth__top">
          <h2>Регистрация</h2>
          <p>Для входа в чат, вам нужно зарегистрироваться</p>
        </div>
        <Block>
          <Form className="login-form" >
                <UploadAvatar 
                  imageInputRef={imageInputRef}
                  setPhotoUrl={setPhotoUrl}/>
                <FormField
                  name="email"
                  placeholder="E-Mail"
                  icon={<MailOutlined /> }
                  type='email'
                  validateFunction={validateField("email", touched, errors)}
                  help={!touched.email ? "" : errors.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormField
                  name="username"
                  placeholder="Введите ваше имя"
                  icon={<UserOutlined /> }
                  type='username'
                  validateFunction={validateField("username", touched, errors)}
                  help={!touched.username ? "" : errors.username}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormField
                  name="password"
                  placeholder="Введите пароль"
                  icon={<LockOutlined /> }
                  type="password"
                  validateFunction={validateField("password", touched, errors)}
                  help={!touched.password ? "" : errors.password}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormField
                  name="password_1"
                  placeholder="Повторите пароль"
                  icon={<LockOutlined /> }
                  type="password"
                  validateFunction={validateField("password_1", touched, errors)}
                  help={!touched.password_1 ? "" : errors.password_1}
                  value={values.password_1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    onClick={handleSubmit}
                  >
                    Зарегистрироваться
                  </Button>
                </Form.Item>
                <Link className="auth__register-link" to="/">
                  Войти в аккаунт
                </Link>
          </Form>
        </Block>
      </div>
    );
};
export default RegisterForm;