import React, { useEffect, useState } from "react";
import { createDialogWithUser } from "../api";
import { findUserByUsername } from "../api";
import { useSelector } from "react-redux";
import { message } from "antd";
import SideBarItem from "../components/Sidebar";

const SideBar = () => {
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.dialogs);

  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filtredItems, setFiltredItems] = useState(items);
  const [filtredValue, setFiltredValue] = useState("");

  const onClose = () => {
    setVisible(false);
  };

  const onFiltered = (value = "") => {
    setFiltredItems(
      items.filter(
        (dialog) =>
          dialog.conversation.author.username
            .toLowerCase()
            .indexOf(value.toLowerCase()) >= 0 ||
          dialog.conversation.partner.username
            .toLowerCase()
            .indexOf(value.toLowerCase()) >= 0
      )
    );
    setFiltredValue(value);
  };

  useEffect(() => {
    onFiltered();
  }, [items]);

  const onShow = () => {
    setVisible(true);
  };

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };
  const onDialogCreate = async (username) => {
    const partner = await findUserByUsername(username).then((item) => {
      if (item.docs.length) {
        return item.docs[0].data();
      } else {
        message.destroy();
        message.error("Пользователь не найден");
      }
    });
    if (partner && user.uid !== partner.id) {
      createDialogWithUser(user.uid, partner.id);
      setVisible(false);
    }
  };
  return (
    <SideBarItem
      onShow={onShow}
      filtredItems={filtredItems}
      filtredValue={filtredValue}
      onFiltered={onFiltered}
      visible={visible}
      onClose={onClose}
      inputValue={inputValue}
      handleChangeInput={handleChangeInput}
      onDialogCreate={onDialogCreate}
    />
  );
};
export default SideBar;
