import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
// Взимаме контекста, където се съхранява информацията за потребителя
import { AuthContext } from '../context/AuthContext';

// Този компонент защитава определени маршрути (страници)
function ProtectedRoute({ children }) {
  // Взимаме текущия потребител от контекста
  const { user } = useContext(AuthContext);

  // Ако няма потребител (не е логнат), го пренасочваме към /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Ако е логнат, показваме съдържанието вътре в ProtectedRoute
  return children;
}

export default ProtectedRoute;
