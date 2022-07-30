import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DashOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { removeActiveClasses } from "../../utils/utils";
import { Popover } from "antd";
import { getOnlineStatus } from "../../api";

import Prompt from "../Prompt";
import Time from "../Time";
import Avatar from "../Avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/components/AuthContext";

const PopUpMod = ({ children, setPromptIsOpened }) => {
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };
  const DeleteDialogTemplate = () => {
    return (
      <span
        className="chat__dialog-header-right-delete__dialog"
        onClick={() => {
          handleVisibleChange(false);
          setPromptIsOpened(true);
        }}
      >
        Удалить диалог
      </span>
    );
  };
  return (
    <Popover
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      content={<DeleteDialogTemplate />}
      overlayClassName={"customerCSS"}
    >
      {children}
    </Popover>
  );
};

const Status = () => {
  const { items: dialogs, currentDialogId } = useSelector(
    (state) => state.dialogs
  );
  const { user } = useAuth();
  const navigate = useNavigate();
  const [promptIsOpened, setPromptIsOpened] = useState(false);
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentDialog =
      dialogs && dialogs.filter((item) => item.id === currentDialogId)[0];

    if (currentDialog && dialogs.length) {
      const partner =
        (currentDialog &&
          currentDialog.conversation.author.id !== user.uid &&
          currentDialog.conversation.author.id &&
          currentDialog.conversation.author) ||
        (currentDialog.conversation.partner.id !== user.uid &&
          currentDialog.conversation.partner.id &&
          currentDialog.conversation.partner);

      getOnlineStatus(partner.id).then((time) => {
        setTime(time);
        setLoading(false);
      });
    }
  }, [dialogs, currentDialogId, user.uid]);

  if (!dialogs.length || !currentDialogId) {
    return null;
  }
  const currentDialog =
    dialogs && dialogs.filter((item) => item.id === currentDialogId)[0];
  const partner =
    (currentDialog.conversation.author.id !== user.uid &&
      currentDialog.conversation.author.id &&
      currentDialog.conversation.author) ||
    (currentDialog.conversation.partner.id !== user.uid &&
      currentDialog.conversation.partner.id &&
      currentDialog.conversation.partner);

  const lastOnline = Math.floor((new Date().getTime() - Number(time)) / 60000);
  return (
    <div className="chat__dialog-header">
      {promptIsOpened && (
        <Prompt
          currentDialogId={currentDialogId}
          setPromptIsOpened={setPromptIsOpened}
        />
      )}
      <div
        className="chat__dialog-header-left"
        onClick={() => {
          navigate("/Chat-App/im");
          removeActiveClasses();
        }}
      >
        <ArrowLeftOutlined />
      </div>
      <div className="chat__dialog-header-center">
        <b className="chat__dialog-header-username">{partner.username}</b>
        <div className="chat__dialog-header-status">
          {lastOnline > 5 && !loading && (
            <span className="chat__dialog-header-status--offline">
              Был в сети <Time created_at={Number(time)} />
            </span>
          )}
          {lastOnline < 5 && !loading && (
            <span className="chat__dialog-header-status--online">В сети</span>
          )}
        </div>
      </div>
      <div className="chat__dialog-header-right">
        <div className="chat__dialog-header-right__popup">
          <PopUpMod setPromptIsOpened={setPromptIsOpened}>
            <DashOutlined />
          </PopUpMod>
        </div>
        <div className="chat__dialog-header-avatar">
          <Avatar user={partner} />
        </div>
      </div>
    </div>
  );
};
export default Status;
