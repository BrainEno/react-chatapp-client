import React from "react";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "../../context/auth";
import { Users } from "./Users";
import { Messages } from "./Messages";

const Home = () => {
  const dispatch = useAuthDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
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
