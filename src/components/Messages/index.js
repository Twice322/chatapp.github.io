import React, { useEffect } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Message from "../../components/Message";
import { fetchMessages } from "../../redux/slices/messages";
import "./Messages.scss";
import { useAuth } from "../../firebase/components/AuthContext";

const Messages = () => {
  const { currentDialogId } = useSelector((state) => state.dialogs);
  const { items, status } = useSelector((state) => state.messages);
  const { user } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    currentDialogId && dispatch(fetchMessages(currentDialogId));
  }, [currentDialogId]);

  return (
    <div
      className="chat__dialog-messages"
      style={{ height: `calc(100% - ${124}px)` }}
    >
      <div
        className={classNames("messages", {
          "messages--loading": status === "loading",
        })}
      >
        {status !== "loading" ? (
          items.length ? (
            items.map((item) => {
              return (
                <Message
                  {...item}
                  key={item.id}
                  isMe={user.uid === item.author.id}
                />
              );
            })
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Сообщений не найдено"
            />
          )
        ) : (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 44 }} spin />} />
        )}
      </div>
    </div>
  );
};
export default Messages;
