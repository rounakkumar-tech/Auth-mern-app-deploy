
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo({
      ...loginInfo,
      [name]: value
    });
  };

  const handleError = (msg) => {
    toast.error(msg);
  };

  const handleSuccess = (msg) => {
    toast.success(msg);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError('Email and Password are required');
    }

    try {
      const url = 'https://auth-mern-app-deploy.vercel.app/auth/login';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();

      const { success, message, jwtToken, name } = result;

      if (success && jwtToken) {
        handleSuccess(message);

        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);

        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        handleError(message || 'Login Failed');
      }

    } catch (err) {
      handleError(err.message || 'Login Failed');
    }
  };

  return (
    <div className='Container'>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            autoFocus
            placeholder='Enter your email'
            onChange={handleChange}
            value={loginInfo.email}
          />
        </div>

        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password'
            onChange={handleChange}
            value={loginInfo.password}
          />
        </div>

        <button type='submit'>Login</button>

        <span>
          Don't have an account?{' '}
          <Link to='/signup'>Sign Up here</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;
