import React, { useEffect } from "react";
import "./Modal.scss";
import { CloseOutlined } from "@ant-design/icons";
const Modal = ({ attachment, setModalIsOpened }) => {

  useEffect(() => {
    document.querySelector(".modal").addEventListener("click", (e) => {
      if (e.target.className === "modal") setModalIsOpened(false);
    });
  }, [attachment, setModalIsOpened]);
  
  return (
    <div className="modal">
      <img src={`${attachment}`} alt="modal_image" />
      <CloseOutlined
        className="modal--close"
        onClick={() => setModalIsOpened(false)}
      />
    </div>
  );
};
export default Modal;