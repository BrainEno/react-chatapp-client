import React, { useState, useEffect } from "react";
import { GET_USERS } from "../graphql/getUsersQuery";
import { GET_MESSAGES } from "../graphql/getMessagesQuery";
import { useQuery, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "../context/auth";

const Home = ({ history }) => {
  const dispatch = useAuthDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const { loading, data, error } = useQuery(GET_USERS);

  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [selectedUser]);

  if (messagesData) {
    console.log(messagesData.getMessages);
  }

  let usersMarkup;

  if (!data || loading) {
    usersMarkup = <p>正在加载...</p>;
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>聊天列表里还没有用户</p>;
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => (
      <div
        key={user.username}
        className='user-info'
        onClick={() => setSelectedUser(user.username)}>
        <img src={user.imageUrl} alt='user' />
        <div>
          <p className='username'>{user.username}</p>
          <p className='user-message'>
            {user.latestMessage ? user.latestMessage.content : "在线"}
          </p>
        </div>
      </div>
    ));
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/login");
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
        <div className='message-left'>{usersMarkup}</div>
        <div className='message-right'>
          {messagesData && messagesData.getMessages.length > 0 ? (
            messagesData.getMessages.map((message) => (
              <p key={message.uuid}>{message.content}</p>
            ))
          ) : (
            <p>暂时没有消息...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
