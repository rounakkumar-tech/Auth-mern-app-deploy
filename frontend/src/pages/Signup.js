import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [SignupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupInfo({
      ...SignupInfo,
      [name]: value
    });
  };

  const handleError = (msg) => {
    toast.error(msg);
  };

  const handleSuccess = (msg) => {
    toast.success(msg);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = SignupInfo;

    if (!name || !email || !password) {
      return handleError('Name, Email and Password are required');
    }

    try {
      const url = 'https://auth-mern-app-deploy.vercel.app/auth/signup';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(SignupInfo)
      });

      const result = await response.json();

      if (response.ok) {
        handleSuccess(result.message || 'Signup Successful');

        setSignupInfo({
          name: '',
          email: '',
          password: ''
        });

        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      } else {
        handleError(result.error || result.message);
      }

    } catch (err) {
      handleError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className='Container'>
      <h1>Sign Up</h1>

      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            autoFocus
            placeholder='Enter your name'
            onChange={handleChange}
            value={SignupInfo.name}
          />
        </div>

        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            onChange={handleChange}
            value={SignupInfo.email}
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
            value={SignupInfo.password}
          />
        </div>

        <button type='submit'>Sign Up</button>

        <span>
          Already have an account?{' '}
          <Link to='/login'>Login here</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Signup;
