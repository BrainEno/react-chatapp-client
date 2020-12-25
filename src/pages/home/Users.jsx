import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/getUsersQuery";
import { useMessageState, useMessageDispatch } from "../../context/message";

export const Users = () => {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectedUser = users?.find((u) => u.selected === true)?.username;
  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) =>
      dispatch({ type: "SET_USERS", payload: data.getUsers }),
    onError: (err) => console.log(err),
  });

  let usersMarkup;

  if (!users || loading) {
    usersMarkup = <p>正在加载...</p>;
  } else if (users.length === 0) {
    usersMarkup = <p>聊天列表里还没有用户</p>;
  } else if (users.length > 0) {
    usersMarkup = users.map((user) => {
      const selected = selectedUser === user.username;
      return (
        <div
          key={user.username}
          className='user-info'
          style={{ background: selected && "white" }}
          onClick={() =>
            dispatch({
              type: "SET_SELECTED_USER",
              payload: user.username,
            })
          }>
          <img src={user.imageUrl} alt='user' />
          <div>
            <p className='username'>{user.username}</p>
            <p className='user-message'>
              {user.latestMessage ? user.latestMessage.content : "暂无消息"}
            </p>
          </div>
        </div>
      );
    });
  }
  return <div className='message-left'>{usersMarkup}</div>;
};
