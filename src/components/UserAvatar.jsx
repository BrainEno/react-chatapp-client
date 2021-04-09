import React from "react";
import { useAuthState } from "../context/auth";

const UserAvatar = () => {
  const { user } = useAuthState();
  return (
    <div className='left-header'>
      <div className='user-header'>
        <img src={user.imageUrl} alt='user' />
        <p className='username'>{user.username}</p>
        <p className='user-status'>正在线上</p>
        <button>
          <i className='fas fa-sync-alt'></i>
        </button>
        <button>
          <i className='fas fa-ellipsis-v'></i>
        </button>
      </div>
      <div className='search-container'>
        <input type='text' />
        <button>
          <i className='fas fa-search'></i>
        </button>
      </div>
    </div>
  );
};

export default UserAvatar;
