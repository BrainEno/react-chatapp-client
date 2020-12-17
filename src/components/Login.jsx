import React from "react";

const Login = () => {
  return (
    <div className='form-container'>
      <h1>登录账户</h1>
      <p>
        还没有账户？点击<a href='/'>这里</a>创建账户
      </p>
      <div className='form-col'>
        <form className='sign-form'>
          <div className='input-container'>
            <label htmlFor='username' className='form-label'>
              昵称
            </label>
            <input type='text' className='form-input' id='username' />
          </div>
          <div className='input-container'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input type='email' className='form-input' id='email' />
          </div>
          <div className='input-container'>
            <label htmlFor='password' className='form-label'>
              密码
            </label>
            <input type='password' className='form-input' id='password' />
          </div>
          <div className='input-container'>
            <label htmlFor='confirmPassword' className='form-label'>
              确认密码
            </label>
            <input
              type='password'
              className='form-input'
              id='confirmPassword'
            />
          </div>
        </form>
        <button className='form-btn'>注册</button>
      </div>
    </div>
  );
};

export default Login;
