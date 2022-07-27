import React from "react";
import { Button, Modal, Input, Form } from "antd";
import {
  TeamOutlined,
  PoweroffOutlined,
  UserAddOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import Dialogs from "../Dialogs";
import { toggleTheme } from "../../utils/utils";
import { message } from "antd";
import { useAuth } from "../../firebase/components/AuthContext";
import WithNavigation from "../../utils/hoc";
import "./Sidebar.scss";

const Sidebar = ({
  onShow,
  filtredItems,
  filtredValue,
  onFiltered,
  visible,
  onClose,
  inputValue,
  handleChangeInput,
  onDialogCreate,
  navigate,
}) => {
  const { logout } = useAuth();
  return (
    <div className="chat__sidebar">
      <div className="chat__sidebar-header">
        <div className="chat__sidebar-header-inner">
          <TeamOutlined />
          <span>Список диалогов</span>
        </div>
        <div>
          <Button
            type="link"
            shape="circle"
            icon={<PoweroffOutlined />}
            id="logout"
            onClick={async () => {
              await logout();
              navigate("/Chat-App");
            }}
          />
          <Button
            type="link"
            shape="circle"
            icon={<BulbOutlined />}
            onClick={toggleTheme}
          />
          <Button
            onClick={onShow}
            type="link"
            shape="circle"
            icon={<UserAddOutlined />}
          />
        </div>
      </div>
      <div className="chat__sidebar-dialogs">
        <Dialogs
          items={filtredItems}
          filteredValue={filtredValue}
          onFiltered={onFiltered}
        />
      </div>
      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "220px",
        }}
        title="Создать диалог"
        visible={visible}
        onCancel={() => {
          message.destroy();
          onClose();
        }}
        footer={[
          <Button key="back" onClick={onClose}>
            Закрыть
          </Button>,
          <Button
            disabled={!inputValue}
            key="submit"
            type="primary"
            onClick={() => onDialogCreate(inputValue)}
          >
            Создать
          </Button>,
        ]}
      >
        <Form className="add-dialog-form">
          <Form.Item>
            <Input
              value={inputValue}
              onChange={handleChangeInput}
              style={{
                maxWidth: "500px",
                height: "40px",
                border: "1px solid var(--borders-color)",
                borderRadius: "5px",
              }}
              placeholder="Введите имя пользователя"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default WithNavigation(Sidebar);
