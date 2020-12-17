import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { LOGIN_USER } from "../graphql/loginQuery.js";

const Login = (props) => {
  const [variables, setVariables] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    onCompleted(data) {
      localStorage.setItem("token", data.login.token);
      props.history.push("/");
    },
  });

  const { email, password } = variables;

  const handleChange = (e) => {
    const name = e.target.name;
    setVariables({
      ...variables,
      [name]: e.target.value,
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    loginUser({ variables });
    setVariables({
      ...variables,
      email: "",
      password: "",
    });
  };

  return (
    <div className='form-container'>
      <h1>登录您的账户</h1>
      <p>
        还没有账户？点击<a href='/register'>这里</a>创建账户
      </p>
      <div className='form-col'>
        <form className='sign-form' onSubmit={submitLogin}>
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

          <button className='form-btn' type='submit' disabled={loading}>
            {loading ? "正在登录" : "登录"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
