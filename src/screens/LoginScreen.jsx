import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debug logging
    console.log('Submitting with:', { email, password });

    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/auth/login`,
        {
          email,
          password,
        }
      );
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        toast.success('Login successful');

        // Force a navigation/refresh to update the header
        setTimeout(() => {
          window.location.href = '/listactionitems'; // This causes a full page reload
          // Alternative: navigate('/listactionitems', { replace: true });
        }, 1000); // Small delay to allow the toast to be visible
      }
    } catch (err) {
      console.log(err);
      toast.error('Login failed; try again');
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <Toaster />
              <h1>Login</h1>
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
