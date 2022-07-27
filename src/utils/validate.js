// eslint-disable-next-line import/no-anonymous-default-export
export default (isAuth = true, values, errors) => {
  const rules = {
    email: (value) => {
      if (!value) {
        errors.email = "Введите E-Mail";
      } else if (
        !isAuth &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ) {
        errors.email = "Неверный E-Mail";
      }
    },
    password: (value) => {
      if (!value) {
        errors.password = "Введите пароль";
      } else if (
        !isAuth &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)
      ) {
        errors.password = "Слишком лёгкий пароль";
      }
    },
    password_1: (value) => {
      if (!isAuth && value !== values.password) {
        errors.password_1 = "Пароли не совпадают";
      } else if (!value) {
        errors.password_1 = "Введите пароль";
      }
    },
    username: (value) => {
      if (!isAuth && !value) {
        errors.username = "Укажите свой никнейм";
      }
    },
  };
  Object.keys(values).forEach((key) => rules[key] && rules[key](values[key]));
};