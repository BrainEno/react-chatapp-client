import React, { useState } from "react";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { email, username, password, confirmPassword } = values;

  const handleChange = (e) => {
    const name = e.target.name;
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };

  const submitRegister = (e) => {
    e.preventDefault();
    console.log("submited");
    console.log(values);
    setValues({
      ...values,
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className='form-container'>
      <h1>创建一个新账户</h1>
      <p>
        已经有账户了？点击<a href='/'>这里</a>登录
      </p>
      <div className='form-col'>
        <form className='sign-form' onSubmit={submitRegister}>
          <div className='input-container'>
            <label htmlFor='username' className='form-label'>
              昵称
            </label>
            <input
              onChange={handleChange}
              name='username'
              value={username}
              type='text'
              className='form-input'
              id='username'
            />
          </div>
          <div className='input-container'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              onChange={handleChange}
              name='email'
              value={email}
              type='email'
              className='form-input'
              id='email'
            />
          </div>
          <div className='input-container'>
            <label htmlFor='password' className='form-label'>
              密码
            </label>
            <input
              onChange={handleChange}
              name='password'
              value={password}
              type='password'
              className='form-input'
              id='password'
            />
          </div>
          <div className='input-container'>
            <label htmlFor='confirmPassword' className='form-label'>
              确认密码
            </label>
            <input
              onChange={handleChange}
              name='confirmPassword'
              value={confirmPassword}
              type='password'
              className='form-input'
              id='confirmPassword'
            />
          </div>
          <button className='form-btn' type='submit'>
            注册
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
