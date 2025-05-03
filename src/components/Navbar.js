
import { Link } from 'react-router-dom'; // За навигация между различни страници в приложението
import React, { useContext } from 'react'; // Използваме React и useContext, за да достъпим данни от контекста
import { AuthContext } from '../context/AuthContext'; // Импортираме контекста за потребителите

function Navbar() {
  // Вземаме данни за потребителя и функцията за изход от контекста
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link to="/" className="navbar-brand">
        🗳️ Survey App
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {/* Менюто със линкове, които водят към различни страници */}
          <li className="nav-item">
            <Link to="/" className="nav-link">Начало</Link>
          </li>
          <li className="nav-item">
            <Link to="/polls" className="nav-link">Анкети</Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">Създай анкета</Link>
          </li>

          {/* Ако потребителят е влязъл, показваме поздрав и бутон за изход */}
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
            // Ако потребителят не е влязъл, показваме линкове за вход и регистрация
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
