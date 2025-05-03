
import { createContext, useState } from 'react';

// Създаваме контекст, който ще споделя информация за потребителя
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Тук пазим кой потребител е влязъл (ако има такъв)
  const [user, setUser] = useState(() => {
    // При зареждане проверяваме дали има запазен потребител
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Функция за вход (запомняме потребителя)
  const login = (userData) => {
    setUser(userData); // Задаваме новия потребител
    localStorage.setItem('user', JSON.stringify(userData)); // Записваме го в localStorage
  };

  // Функция за изход (махаме потребителя)
  const logout = () => {
    setUser(null); // Премахваме потребителя от състоянието
    localStorage.removeItem('user'); // Изчистваме го от localStorage
  };

  // Даваме достъп до user, login и logout на всички компоненти в приложението
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
