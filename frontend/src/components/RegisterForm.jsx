import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== repeat) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const res = await axios.post('/api/register', {
        username,
        password,
      });

      if (res.data.success) {
        setSuccess('Регистрация прошла успешно. Теперь войдите.');
        setUsername('');
        setPassword('');
        setRepeat('');
        onRegister?.();
      } else {
        setError(res.data.error || 'Ошибка регистрации');
      }
    } catch (err) {
      setError('Ошибка сервера');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Регистрация</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
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
      <div>
        <input
          type="password"
          placeholder="Повторите пароль"
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
        />
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
