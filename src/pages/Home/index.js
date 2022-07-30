import React, { useEffect, useState } from "react";
import SideBar from "../../wrappers/SideBarWrapper";
import Status from "../../components/Status";
import Messages from "../../components/Messages";
import ChatInput from "../../wrappers/ChatInputWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDialogId } from "../../redux/slices/dialogs";
import { Empty } from "antd";
import classNames from "classnames";
import "./Home.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/components/AuthContext";

const Home = () => {
  const { currentDialogId } = useSelector((state) => state.dialogs);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    const dialogId = window.location.pathname.split(/im/).pop().slice(1);
    dispatch(setCurrentDialogId(dialogId));
  }, [location]);

  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });
  return (
    user && (
      <section className="home">
        <div className="chat">
          {width < 600 && currentDialogId ? null : <SideBar />}
          <div
            className={classNames("chat__dialog", {
              "chat__dialog--mobile": width < 600,
              "chat__dialog--mobile-active": currentDialogId,
            })}
          >
            {currentDialogId ? (
              <>
                <Status />
                <Messages />
                <div className="chat__dialog-input">
                  <ChatInput />
                </div>
              </>
            ) : (
              <Empty description="Откройте диалог" />
            )}
          </div>
        </div>
      </section>
    )
  );
};
export default Home;
