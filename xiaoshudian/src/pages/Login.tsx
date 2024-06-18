// src/pages/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../containers/API';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = await API.login(username, password);
    if (data) {
      login(data.accessToken, data.user.role, data.user.id);
      console.log(data);
      navigate('/');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className='bookDetails-container'>
      <form onSubmit={handleLogin} className='editBookItem'>
        <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="submit" value="Login" onSubmit={handleLogin}/>
      </form>
    </div>
  );
};

export default Login;
