import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debug logging
    console.log('Submitting with:', { name, email, password });

    if (!name || !email || !password) {
      toast.error('Name, Email and password are required');
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/auth/register`,
        {
          name,
          email,
          password,
        }
      );
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      toast.error('Registration failed; try again');
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <Toaster />
              <h1>Register</h1>
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
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

export default RegisterScreen;
