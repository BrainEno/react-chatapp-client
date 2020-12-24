import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MESSAGES } from "../../graphql/getMessagesQuery";
import { useMessageDispatch, useMessageState } from "../../context/message";

export const Messages = () => {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectedUser = users?.find((u) => u.selected === true);
  const messages = selectedUser?.messages;

  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: {
          username: selectedUser.username,
          messages: messagesData.getMessages,
        },
      });
    }
  }, [messagesData]);

  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p>选择一个好友开始聊天</p>;
  } else if (messagesLoading) {
    selectedChatMarkup = <p>正在加载...</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message) => (
      <p key={message.uuid}>{message.content}</p>
    ));
  } else if (messages.length === 0) {
    selectedChatMarkup = <p>会话已连接！向TA发送消息</p>;
  }

  return <div className='message-right'>{selectedChatMarkup}</div>;
};
