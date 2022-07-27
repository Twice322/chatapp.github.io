import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";
import "./UploadAvatar.scss";
const UploadAvatar = ({ imageInputRef, setPhotoUrl }) => {
  const [image, setImage] = useState(false);

  const onInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = async () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setPhotoUrl(e.target.files[0]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  
  return (
    <div className="avatar-upload">
      <div
        className={classNames("avatar-upload__select", {
          "avatar-upload__select--image-selected": image,
        })}
        onClick={() => imageInputRef.current.click()}
      >
        {image ? (
          <img className="avatar-upload__selected" src={image} alt="avatar" />
        ) : (
          <span className="avatar-upload__select__image" role={"button"}>
            <input
              type="file"
              className="avatar-upload__select-input"
              onChange={onInputChange}
              ref={imageInputRef}
            />
            <div className="avatar-upload__select__image-text">
              <PlusOutlined />
              <span>Avatar</span>
            </div>
          </span>
        )}
      </div>
    </div>
  );
};
export default UploadAvatar;