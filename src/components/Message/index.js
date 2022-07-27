import React, { useState } from "react";
import classNames from "classnames";
import MessageReadIcon from "../MessageReadIcon";
import Time from "../../components/Time";
import Avatar from "../../components/Avatar";
import Modal from "../Modal";
import "./Message.scss";

const Message = ({ author, text, isMe, created_at, attachments, read }) => {
  const [modalIsOpened, setModalIsOpened] = useState(false);
  return (
    <div
      className={classNames("message", {
        "message--isme": isMe,
      })}
    >
      <div className="message__content">
        <div className="message__avatar">
          <Avatar user={author} />
        </div>
        <div className="message__info">
          <div
            className={classNames("message__bubble", {
              message__bubble__with__attachments: attachments,
            })}
          >
            {attachments && (
              <div className="message__attachments">
                {modalIsOpened ? (
                  <Modal
                    attachment={attachments}
                    setModalIsOpened={setModalIsOpened}
                  />
                ) : null}
                <div
                  className="message__attachments-block"
                  onClick={() => setModalIsOpened(true)}
                >
                  <img src={`${attachments}`} alt={"attachment"} />
                </div>
              </div>
            )}
            {text && <p className="message__text">{text}</p>}
          </div>
          <div className="message__footer">
            {isMe ? (
              <>
                <MessageReadIcon isRead={read} />
                <span className="message__date">
                  <Time created_at={created_at} />
                </span>
              </>
            ) : (
              <>
                <span className="message__date">
                  <Time created_at={created_at} />
                </span>
                <MessageReadIcon isMe={isMe} isRead={read} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Message;
