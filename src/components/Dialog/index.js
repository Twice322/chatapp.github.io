import React, { useEffect } from "react";
import classNames from "classnames";
import Avatar from "../Avatar";
import MessageReadIcon from "../MessageReadIcon";
import { Link } from "react-router-dom";
import { getMessageTime, renderLastMessage } from "../../utils/utils";
import { onChangeReadStatus, updateOnlineStatus } from "../../api";
import { capitalize } from "../../utils/utils";
import { addActiveClass } from "../../utils/utils";

const Dialog = ({
  partner,
  dialogId,
  lastMessage,
  userId,
  currentDialogId,
  isMe,
}) => {
  useEffect(() => {
    if (
      currentDialogId === dialogId &&
      lastMessage &&
      userId !== lastMessage.author.id &&
      userId !== partner.id
    ) {
      onChangeReadStatus(dialogId);
    }
    const dialogItems = document.querySelectorAll(".dialogs__item");

    dialogItems.forEach((dialog) => {
      if (dialog.getAttribute("data-key") === currentDialogId) {
        dialog.classList.add("active");
      }
    });
  }, [dialogId, userId, lastMessage, partner.id, currentDialogId]);

  return (
    <Link to={`/im/${dialogId}`} onClick={addActiveClass}>
      <div
        onClick={() => {
          updateOnlineStatus(userId, new Date().getTime());
        }}
        className={classNames("dialogs__item", {
          "dialogs__item--selected": false,
        })}
        data-key={dialogId}
      >
        <div className="dialogs__item-avatar">
          <Avatar user={partner} />
        </div>
        <div className="dialogs__item-info">
          <div className="dialogs__item-info-top">
            <b>{capitalize(partner.username)}</b>
            <span>
              {lastMessage &&
                getMessageTime(lastMessage && new Date(lastMessage.created_at))}
            </span>
          </div>
          <div className="dialogs__item-info-bottom">
            {lastMessage ? renderLastMessage(lastMessage, userId) : null}
            {lastMessage &&
              lastMessage.unread > 0 &&
              lastMessage.author.id !== userId && (
                <div className="dialogs__item-info-bottom-count">
                  {lastMessage.unread}
                </div>
              )}
            {lastMessage && lastMessage.read && (
              <MessageReadIcon isMe={isMe} isRead={lastMessage.read} />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Dialog;
