import React, { useEffect } from "react";
import { Input } from "antd";
import { Empty, Spin } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import DialogItem from "../Dialog";
import "./Dialogs.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchDialogs } from "../../redux/slices/dialogs";
import { useAuth } from "../../firebase/components/AuthContext";

const Dialogs = ({ filteredValue, onFiltered, items }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { status, currentDialogId } = useSelector((state) => state.dialogs);

  useEffect(() => {
    dispatch(fetchDialogs(user.uid));
  }, [user]);

  return (
    <div className="dialogs">
      <div className="dialogs__search">
        <Input
          placeholder="Поиск среди контактов"
          value={filteredValue}
          onChange={(e) => onFiltered(e.target.value)}
        />
        <span className="dialogs__search-icon">
          <SearchOutlined />
        </span>
      </div>
      {status !== "loading" ? (
        items.length ? (
          items.map((item) => {
            let partner = {};

            if (item.conversation.author.id === user.uid) {
              partner = item.conversation.partner;
            } else {
              partner = item.conversation.author;
            }

            return (
              <DialogItem
                {...item}
                partner={partner}
                key={item.id}
                userId={user.uid}
                dialogId={item.id}
                isMe={item.conversation.author.id === user.uid}
                currentDialogId={currentDialogId}
              />
            );
          })
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Диалогов не найдено"
          />
        )
      ) : (
        <div className="dialogs--loading">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 44 }} spin />} />
        </div>
      )}
    </div>
  );
};
export default Dialogs;
