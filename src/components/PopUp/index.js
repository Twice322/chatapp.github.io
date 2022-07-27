import React from "react";
import { Popover } from "antd";
import { FileImageOutlined, DeleteOutlined } from "@ant-design/icons";
import "./PopUp.scss";
const PopUp = ({ children, files, deleteFiles }) => {
  const content = files && (
    <div className="popup-content">
      <div className="popup-content__left">
        <FileImageOutlined style={{ color: "#71aaeb" }} />
        <span className="popup-content__filename">
          {files.name.length > 15
            ? `${
                files.name.split(".")[0].substring(1, 10) +
                "(...)" +
                "." +
                files.name.split(".")[1]
              }`
            : files.name}
        </span>
      </div>
      <div className="popup-content__right">
        <DeleteOutlined onClick={deleteFiles} style={{ color: "#ff4d4f" }} />
      </div>
    </div>
  );
  
  return (
    <div>
      <Popover
        content={files ? content : null}
        trigger="hover"
        overlayClassName={"customerCSS"}
      >
        {children}
      </Popover>
    </div>
  );
};
export default PopUp;