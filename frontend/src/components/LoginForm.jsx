import React, { useState } from 'react';
import axios from 'axios';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', {
        username,
        password
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        onLogin?.();
      } else {
        setError(res.data.error || 'Ошибка входа');
      }
    } catch (err) {
      setError('Ошибка сервера');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Вход</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Войти</button>
    </form>
  );
}
