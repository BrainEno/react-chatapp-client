import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { REGISTER_USER } from "../graphql/registerMutation.js";

const Register = (props) => {
  const [variables, setVariables] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, __) => props.history.push("/login"),
    onError: (err) => {
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.errors)
      setErrors(err);
    },
  });

  const { email, username, password, confirmPassword } = variables;

  const handleChange = (e) => {
    const name = e.target.name;
    setVariables({
      ...variables,
      [name]: e.target.value,
    });
  };

  const submitRegister = (e) => {
    e.preventDefault();
    registerUser({ variables });
    setVariables({
      ...variables,
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
        已经有账户了？点击<a href='/login'>这里</a>登录
      </p>
      <div className='form-col'>
        <form className='sign-form' onSubmit={submitRegister}>
          <div className='input-container'>
            <label htmlFor='username' className={errors.username && "error"}>
              {errors.username ?? "昵称"}
            </label>
            <input
              onChange={handleChange}
              name='username'
              value={username}
              type='text'
              className={errors.username && "isInvalid"}
              id='username'
            />
          </div>
          <div className='input-container'>
            <label htmlFor='email' className={errors.email && "error"}>
              {errors.email ?? "Email"}
            </label>
            <input
              onChange={handleChange}
              name='email'
              value={email}
              type='email'
              className={errors.email && "isInvalid"}
              id='email'
            />
          </div>
          <div className='input-container'>
            <label htmlFor='password' className={errors.password && "error"}>
              {errors.password ?? "密码"}
            </label>
            <input
              onChange={handleChange}
              name='password'
              value={password}
              type='password'
              className={errors.password && "isInvalid"}
              id='password'
            />
          </div>
          <div className='input-container'>
            <label
              htmlFor='confirmPassword'
              className={errors.confirmPassword && "error"}>
              {errors.confirmPassword ?? "确认密码"}
            </label>
            <input
              onChange={handleChange}
              name='confirmPassword'
              value={confirmPassword}
              type='password'
              className={errors.confirmPassword && "isInvalid"}
              id='confirmPassword'
            />
          </div>
          <button className='form-btn' type='submit' disabled={loading}>
            {loading ? "正在提交" : "注册"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
