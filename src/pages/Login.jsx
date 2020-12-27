import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { LOGIN_USER } from "../graphql/loginQuery.js";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "../context/auth";

const Login = () => {
  const [variables, setVariables] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useAuthDispatch();

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => {
      if (err.graphQLErrors[0].extensions.errors) {
        setErrors(err.graphQLErrors[0].extensions.errors);
      }
      console.log(err);
      setErrors(err);
    },
    onCompleted(data) {
      dispatch({ type: "LOGIN", payload: data.login });
      window.location.href = "/";
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
        还没有账户？点击<Link to='/register'>这里</Link>创建账户
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
