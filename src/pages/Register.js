import React, { useRef } from 'react';
import axios from 'axios';

function Register() {
  // Създаваме препратки към полетата
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleRegister(e) {
    e.preventDefault(); // Спираме презареждането на страницата

    // Вземаме стойностите от input полетата
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      // Създаваме нов потребител
      const newUser = { name, email, password };

      // Изпращаме заявката към сървъра
      await axios.post('http://localhost:5000/users', newUser);

      alert('Регистрацията е успешна!');
      // Може тук да добавим пренасочване към login
    } catch (error) {
      console.error('Грешка при регистрация:', error);
      alert('Възникна грешка при регистрацията.');
    }
  }

  // Стилове дефинирани като обекти
 const styles = {
    wrapper: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(145deg, #eef1f5, #d4dce4)',
      fontFamily: 'Arial, sans-serif',
    },
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
    button: {
      padding: '14px',
      backgroundColor: '#007bff',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };


  
  return (
    <div tyle={styles.wrapper}>
      <form style={styles.card} onSubmit={handleRegister}>
        <h2 style={styles.title}>Регистрация</h2>
        <div>
          <label>Име:</label>
          <input type="text" ref={nameRef} required />
        </div>

        <div>
          <label>Имейл:</label>
          <input type="email" ref={emailRef} required />
        </div>

        <div>
          <label>Парола:</label>
          <input type="password" ref={passwordRef} required />
        </div>

        <button type="submit"  style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}>Регистрация</button>
      </form>
    </div>
  );
}

export default Register;
