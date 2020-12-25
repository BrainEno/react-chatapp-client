import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSubscription } from "@apollo/client";
import { NEW_MESSAGE } from "../../graphql/newMessageSub";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useMessageDispatch } from "../../context/message";
import { Users } from "./Users";
import { Messages } from "./Messages";

const Home = () => {
  const authDispatch = useAuthDispatch();
  const messageDispatch = useMessageDispatch();
  const { user } = useAuthState();
  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE
  );

  useEffect(() => {
    if (messageError) console.log(messageError);

    if (messageData) {
      const message = messageData.newMessage;
      const otherUser =
        user.username === message.to ? message.from : message.to;

      messageDispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: otherUser,
          message: message,
        },
      });
    }
  }, [messageData, messageError]);

  const logout = () => {
    authDispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  return (
    <>
      <nav className='header'>
        <div className='menu'>
          <ul>
            <Link to='/login'>
              <li>登录</li>
            </Link>
            <Link to='/register'>
              <li>注册</li>
            </Link>
            <li onClick={logout}>退出登录</li>
          </ul>
        </div>
      </nav>

      <div className='message-container'>
        <Users />
        <Messages />
      </div>
    </>
  );
};

export default Home;
