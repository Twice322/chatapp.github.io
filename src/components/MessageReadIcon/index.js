import React from "react";
import readSvg from "../../images/readed.svg";
import noReadSvg from "../../images/noreaded.svg";

const MessageReadIcon = ({ isRead }) => {
  return isRead ? (
    <img className="message__icon-read" src={readSvg} alt="Read icon" />
  ) : (
    <img
      className="message__icon-read message__icon-read--no"
      src={noReadSvg}
      alt="Unread icon"
    />
  );
};
export default MessageReadIcon;