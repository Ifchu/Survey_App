// src/components/Navbar.js
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';



function Navbar() {
	const { user, logout } = useContext(AuthContext);
   return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link to="/" className="navbar-brand">
        🗳️ Voting App
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">Начало</Link>
          </li>
          <li className="nav-item">
            <Link to="/polls" className="nav-link">Анкети</Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">Създай анкета</Link>
          </li>

          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link">Здравей, {user.name}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-sm btn-outline-light ms-2" onClick={logout}>
                  Изход
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Вход</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Регистрация</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;