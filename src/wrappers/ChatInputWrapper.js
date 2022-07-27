import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileToStorage } from "../api";
import { ChatInput as ChatInputItem } from "../components/ChatInput";
import { fetchSendMessage } from "../redux/slices/messages";

const ChatInput = () => {
  const [value, setValue] = useState("");
  const { user } = useSelector((state) => state.user);
  const { currentDialogId } = useSelector((state) => state.dialogs);

  const dispatch = useDispatch();
  const [emojiPickerVisible, setShowEmojiPicker] = useState(false);

  const [_, setChosenEmoji] = useState(null);

  const [files, setFiles] = useState(null);

  const inputFileRef = useRef();

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!emojiPickerVisible);
  };

  const addEmoji = (emoji) => {
    setValue((value + "" + emoji.native).trim());
  };

  const sendMessage = async () => {
    if (value || files) {
      const attachments = files ? await uploadFileToStorage(files) : null;
      dispatch(
        fetchSendMessage({
          authorId: user.uid,
          dialogId: currentDialogId,
          text: value,
          attachments,
        })
      );
      setValue("");
      setFiles(null);
    }
  };

  const handleSendMessage = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  const handleOutsideClick = (el, e) => {
    if (el && !el.contains(e.target)) {
      setShowEmojiPicker(false);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const onInputChange = (e) => {
    if (!e.target.files.length) return;

    const files = Array.from(e.target.files);
    if (files[0].type.match("image")) {
      setFiles(files[0]);
    }
  };

  const onInputClear = () => {
    inputFileRef.current.value = null;
    setFiles(null);
  };

  useEffect(() => {
    const el = document.querySelector(".chat-input__smile-btn");
    document.addEventListener("click", handleOutsideClick.bind(this, el));
    return () => {
      document.removeEventListener("click", handleOutsideClick.bind(this, el));
    };
  }, []);

  return (
    <ChatInputItem
      emojiPickerVisible={emojiPickerVisible}
      onEmojiClick={onEmojiClick}
      toggleEmojiPicker={toggleEmojiPicker}
      value={value}
      addEmoji={addEmoji}
      handleSendMessage={handleSendMessage}
      inputFileRef={inputFileRef}
      setValue={setValue}
      sendMessage={sendMessage}
      files={files}
      onInputClear={onInputClear}
      onInputChange={onInputChange}
    />
  );
};
export default ChatInput;
