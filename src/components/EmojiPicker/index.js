import React, { useRef, useEffect } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const EmojiPicker = ({ addEmoji }) => {
  const ref = useRef();
  
  const htmlHasAttribute = document
    .querySelector("html")
    .hasAttribute("data-theme");

  useEffect(() => {
    if (htmlHasAttribute) {
      document.querySelector(".emoji-mart").classList.add("emoji-mart-dark");
    } else {
      document.querySelector(".emoji-mart").classList.add("emoji-mart-light");
    }
  }, [htmlHasAttribute]);

  return (
    <div className="emoji__picker" ref={ref}>
      <Picker onSelect={addEmoji} />
    </div>
  );
};
export default EmojiPicker;
