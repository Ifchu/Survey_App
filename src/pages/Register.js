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

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister}>
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

        <button type="submit">Регистрация</button>
      </form>
    </div>
  );
}

export default Register;
