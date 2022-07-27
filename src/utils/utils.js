import { isToday, format } from "date-fns";
import tinycolor from "tinycolor2";

export const getMessageTime = (createdAt) => {
  if (isToday(createdAt)) {
    return format(createdAt, "HH:mm");
  } else {
    return format(createdAt, "dd.MM.yyyy");
  }
};
export const renderLastMessage = ({ author: { id }, text }, userId) => {
  return id === userId ? (
    <p className="dialogs__item-info-bottom-text">
      <span>Вы:</span>
      <span
        className={!text ? "dialogs__item-info-bottom-text--file" : undefined}
      >
        {!text ? "Файл" : text}
      </span>
    </p>
  ) : (
    <p className="dialogs__item-info-bottom-text">
      <span
        className={!text ? "dialogs__item-info-bottom-text--file" : undefined}
      >
        {!text ? "Файл" : text}
      </span>
    </p>
  );
};
export const toggleTheme = () => {
  if (document.documentElement.hasAttribute("data-theme")) {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
};
export const capitalize = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);
export const removeActiveClasses = () => {
  document
    .querySelectorAll(".dialogs__item")
    .forEach((dialog) => dialog.classList.remove("active"));
};
export const addActiveClass = (e) => {
  const dialogItem = e.target.closest(".dialogs__item");
  removeActiveClasses();
  dialogItem.classList.add("active");
};
export const getCorrectIndex = (number) => {
  if (number > 255) {
    return 255;
  }
  if (number < 0) {
    return 0;
  }
  return number > 255 ? 255 : number < 0 ? 0 : number;
};
export const generateAvatarFromHash = (hash) => {
  const [r, g, b] = hash
    .substr(0, 3)
    .split("")
    .map((char) => getCorrectIndex(char.charCodeAt(0)));
  return {
    color: tinycolor({ r, g, b }).lighten(10).saturate(10).toHexString(),
    colorLighten: tinycolor({ r, g, b }).lighten(30).saturate(30).toHexString(),
  };
};
export const validateField = (key, touched, errors) => {
  if (touched[key]) {
    if (errors[key]) {
      return "error";
    } else {
      return "success";
    }
  } else {
    return "";
  }
};
export const errorMessage = (errorCode) => {
  switch (errorCode) {
    case "user-not-found":
      return "Такого пользователя не существует";
    case "wrong-password":
      return " Неверный пароль";
    default:
      return "Ошибка авторизации";
  }
};