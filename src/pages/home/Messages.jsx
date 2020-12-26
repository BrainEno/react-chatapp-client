import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES } from "../../graphql/getMessagesQuery";
import { SEND_MESSAGE } from "../../graphql/sendMessageMutation";
import { useMessageDispatch, useMessageState } from "../../context/message";
import Message from "../../components/Message";

export const Messages = () => {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const [content, setContent] = useState("");
  const selectedUser = users?.find((u) => u.selected === true);
  const messages = selectedUser?.messages;

  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) => console.log(err),
  });

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

  const submitMessage = (e) => {
    e.preventDefault();
    if (content.trim() === "" || !selectedUser) return;

    //mutation for sending the message
    sendMessage({ variables: { to: selectedUser.username, content } });
    setContent("");
  };

  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p className='tip-text'>选择一个好友开始聊天</p>;
  } else if (messagesLoading) {
    selectedChatMarkup = <p className='tip-text'>正在加载...</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message) => (
      <Message key={message.uuid} message={message} />
    ));
  } else if (messages.length === 0) {
    selectedChatMarkup = <p className='tip-text'>会话已连接！向TA发送消息</p>;
  }

  return (
    <div className='messages-right'>
      <div className='right-header'>
        {selectedUser && (
          <p>
            正在与 <span>{selectedUser.username}</span> 会话
          </p>
        )}
      </div>
      <div className='msg-box'>{selectedChatMarkup}</div>

      <div className='msg-input'>
        <form onSubmit={submitMessage} className='send-msg'>
          <button className='fa-btn'>
            <i className='far fa-smile'></i>
          </button>
          <input
            type='text'
            placeholder='输入消息...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type='submit' className='text-btn'>
            发送
          </button>
        </form>
      </div>
    </div>
  );
};
