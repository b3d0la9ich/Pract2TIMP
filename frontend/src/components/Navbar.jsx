import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/baggage" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Сканер багажа
      </NavLink>
      <NavLink to="/person" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Сканер человека
      </NavLink>
      <NavLink to="/incidents" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Инциденты
      </NavLink>

      {!isLoggedIn ? (
        <>
          <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Вход
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Регистрация
          </NavLink>
        </>
      ) : (
        <button onClick={handleLogout} className="nav-link logout-button">
          Выйти
        </button>
      )}
    </nav>
  );
}
