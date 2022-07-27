import React, { Fragment } from "react";
import { Button, Input } from "antd";
import {
  SmileOutlined,
  SendOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import "./ChatInput.scss";
import PopUp from "../PopUp";
import EmojiPicker from "../EmojiPicker";

export const ChatInput = ({
  emojiPickerVisible,
  toggleEmojiPicker,
  value,
  addEmoji,
  handleSendMessage,
  inputFileRef,
  setValue,
  sendMessage,
  files,
  onInputClear,
  onInputChange,
}) => {
  return (
    <Fragment>
      <div className="chat-input">
        <div className="chat-input-inner">
          <div className="chat-input__smile-btn" id={"action"}>
            <div className="chat-input__emoji-picker">
              {emojiPickerVisible && <EmojiPicker addEmoji={addEmoji} />}
            </div>
            <Button
              type="link"
              shape="circle"
              icon={<SmileOutlined />}
              onClick={toggleEmojiPicker}
            />
          </div>
          <Input
            size="large"
            placeholder="Введите текст сообщения…"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onKeyUp={handleSendMessage}
          />
          <div className="chat-input__actions">
            <Button
              type="link"
              shape="circle"
              icon={<SendOutlined />}
              onClick={sendMessage}
              id={"action"}
            />
            <PopUp
              files={files}
              deleteFiles={onInputClear}
              style={{ background: "red" }}
            >
              <div className="files-add">
                <Button
                  type="link"
                  shape="circle"
                  icon={<PaperClipOutlined />}
                  onClick={() => inputFileRef.current.click()}
                  id={"action"}
                />
                {files && <div className="files__count">{1}</div>}
              </div>
            </PopUp>
            <input
              type={"file"}
              style={{ display: "None" }}
              onChange={onInputChange}
              ref={inputFileRef}
              multiple
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
