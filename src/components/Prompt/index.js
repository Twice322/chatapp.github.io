import React, { useEffect } from "react";
import "./Prompt.scss";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { deleteDialog } from "../../api";
import WithNavigation from "../../utils/hoc";

const Prompt = ({ setPromptIsOpened, currentDialogId, navigate }) => {

  useEffect(() => {
    document.querySelector(".prompt").addEventListener("click", (e) => {
      if (e.target.className === "prompt") setPromptIsOpened(false);
    });
  }, [setPromptIsOpened]);
  
  return (
    <div className="prompt">
      <div className="prompt__body">
        <div className="prompt__body__title">
          <h1>Удалить все сообщения и диалог</h1>
          <CloseOutlined
            onClick={() => {
              setPromptIsOpened(false);
            }}
          />
        </div>
        <div className="prompt__body__text">
          Вы действительно хотите <b>удалить всю переписку</b> с данным
          пользователем?
          <br></br>
          <br></br>
          Отменить это действие будет <b>невозможно</b>
        </div>
        <div className="prompt__body__footer">
          <Button
            type="button"
            onClick={() => {
              setPromptIsOpened(false);
            }}
          >
            Нет
          </Button>
          <Button
            type="button"
            onClick={() => {
              deleteDialog(currentDialogId);
              setPromptIsOpened(false);
              navigate("/im");
            }}
          >
            Да
          </Button>
        </div>
      </div>
    </div>
  );
};
export default WithNavigation(Prompt);