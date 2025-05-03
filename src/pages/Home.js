import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';




// Главна начална страница на приложението
function Home() {
	// Взимаме текущия потребител от контекста (дали е логнат)
  const { user } = useContext(AuthContext);


 // CSS стилове дефинирани като обекти (вместо външен .css файл)

 const styles = {
	 // Основен контейнер, центрира съдържанието по хоризонтал и вертикал
    wrapper: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(145deg, #eef1f5, #d4dce4)',
      fontFamily: 'Arial, sans-serif',
    },
	// Карта/кутия, която съдържа съдържанието
    card: {
      background: '#fff',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      width: '100%',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
	    // Заглавие (центрирано и удебелено)
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
    },
    input: {
      padding: '14px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
	// Стил за линковете (напр. вход и регистрация)
  link: {
      textAlign: 'center',
      marginTop: '10px',
	  marginRight: '12px',
      fontSize: '14px',
      color: '#007bff',
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
	// Стил за линковете (напр. вход и регистрация)
    linkHover: {
      color: '#0056b3',
    },
  };



  return (
    <div style={styles.wrapper}>
	 {/* Формата не е активна тук, използвана е за стилизиране на съдържанието */}
	 <form style={styles.card}>
      <div>
	   {/* Основно заглавие на страницата */}
        <h1 style={styles.title}>🗳️ Добре дошли във Survey App</h1>
		{/* Кратко описание за приложението */}
        <p>
          Тук можете да създавате анкети, да гласувате и да видите какво мислят другите!
        </p>

		 {/* Проверка дали потребителят е логнат */}
        {!user ? (
          <>
            <p style={styles.title}>За да участвате, моля:</p>
			 {/* Линк към Регистрация */}
			<Link
          to="/register"
          style={styles.link}
          onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
          onMouseOut={(e) => (e.target.style.color = styles.link.color)}> Регистрация
		  </Link>
		  {/* Линк към Вход */}
            <Link to="/login"  style={styles.link}
          onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
          onMouseOut={(e) => (e.target.style.color = styles.link.color)}>
              Вход
            </Link>
          </>
        ) : (
          <>
			  {/* Ако е логнат, показваме персонализирано съобщение */}
            <p>Радваме се, че си тук, <strong>{user.name}</strong>!</p>
            {/* Линк към анкетите */}
			<Link to="/polls" style={styles.link}
          onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
          onMouseOut={(e) => (e.target.style.color = styles.link.color)} >
              Виж всички анкети
            </Link>
          </>
        )}
      </div>
	  </form>
    </div>
  );
}

export default Home;
