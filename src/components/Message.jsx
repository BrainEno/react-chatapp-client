import React from "react";
import { useAuthState } from "../context/auth";
import { format, isToday, parseISO } from "date-fns";
import zhLocale from "date-fns/locale/zh-CN";

const Message = ({ message }) => {
  const { user } = useAuthState();
  const sent = message.from === user.username;

  return (
    <div
      className='msg-container'
      style={{
        justifyContent: sent ? "flex-end" : "flex-start",
      }}>
      {!sent && (
        <div className='msg-info'>
          <img src={user.imageUrl} alt='user' className='user-avatar' />

          <small className='time-stamp' style={{ marginRight: "10px" }}>
            {isToday(parseISO(message.createdAt, { locale: zhLocale }))
              ? format(parseISO(message.createdAt), "bb hh:mm", {
                  locale: zhLocale,
                })
              : format(parseISO(message.createdAt), "MM/dd bb", {
                  locale: zhLocale,
                })}
          </small>
        </div>
      )}
      <div className={sent ? "my-msg" : "other-msg"}>
        <p key={message.key}>{message.content}</p>
      </div>

      {sent && (
        <div className='msg-info'>
          <img src={user.imageUrl} alt='user' className='user-avatar' />

          <small className='time-stamp'>
            {isToday(parseISO(message.createdAt, { locale: zhLocale }))
              ? format(parseISO(message.createdAt), "bb hh:mm", {
                  locale: zhLocale,
                })
              : format(parseISO(message.createdAt), "MM/dd bb", {
                  locale: zhLocale,
                })}
          </small>
        </div>
      )}
    </div>
  );
};

export default Message;
