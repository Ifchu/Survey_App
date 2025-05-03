// Updated by Velislav on 3.05
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <div className="text-center p-5 bg-light rounded shadow-sm">
        <h1 className="mb-4">🗳️ Добре дошли във Survey App</h1>

        <p className="lead">
          Тук можете да създавате анкети, да гласувате и да видите какво мислят другите!
        </p>

        {!user ? (
          <>
            <p className="mt-4">За да участвате, моля:</p>
            <Link to="/register" className="btn btn-success me-2">
              Регистрация
            </Link>
            <Link to="/login" className="btn btn-outline-primary">
              Вход
            </Link>
          </>
        ) : (
          <>
            <p className="mt-4">Радваме се, че си тук, <strong>{user.name}</strong>!</p>
            <Link to="/polls" className="btn btn-primary">
              Виж всички анкети
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
