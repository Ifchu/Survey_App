import { useState, useContext } from 'react'; // Импортираме нужните React hooks: useState за управление на състоянието и useContext за достъп до контекст.
import axios from 'axios'; // Импортираме axios за правене на HTTP заявки към сървъра.
import { useNavigate } from 'react-router-dom'; // Импортираме useNavigate за навигация между страниците.
import { AuthContext } from '../context/AuthContext'; // Импортираме AuthContext, за да имаме достъп до информация за потребителя.

function CreatePoll() {
  // useState за съхранение на въпроса на анкетата. Началната стойност е празен низ.
  const [question, setQuestion] = useState('');
  // useState за съхранение на опциите на анкетата. Началната стойност е масив от два празни низа (минимум 2 опции).
  const [options, setOptions] = useState(['', '']);
  // useContext за достъп до обекта user от AuthContext, който съдържа информация за текущия потребител.
  const { user } = useContext(AuthContext);
  // useNavigate hook за програмно пренасочване към други страници.
  const navigate = useNavigate();

  // Функция, която се извиква при промяна на текста във полето за въпрос.
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value); // Обновява състоянието question с новата стойност от полето.
  };

  // Функция, която се извиква при промяна на текста в едно от полетата за опция.
  // Приема индекса на опцията и самото събитие като аргументи.
  const handleOptionChange = (index, event) => {
    const newOptions = [...options]; // Създаваме копие на масива options, за да можем да го променим безопасно.
    newOptions[index] = event.target.value; // Обновяваме стойността на опцията на дадения индекс с новата стойност от полето.
    setOptions(newOptions); // Обновяваме състоянието options с новия масив.
  };

  // Функция за добавяне на нова опция към анкетата.
  const addOption = () => {
    // Проверяваме дали броят на опциите е по-малък от 4 (максимумът, който сме задали).
    if (options.length < 4) {
      setOptions([...options, '']); // Добавяме нов празен низ към масива options, което води до рендериране на ново поле за опция.
    }
  };

  // Асинхронна функция, която се извиква при изпращане на формата.
  const handleSubmit = async (event) => {
    event.preventDefault(); // Предотвратяваме стандартното поведение на формата (презареждане на страницата).

    // Създаваме обект с данните за анкетата, които ще бъдат изпратени към сървъра.
    const pollData = {
      question: question, // Вземаме въпроса от състоянието question.
      options: options.map((text, index) => ({ id: index + 1, text, votes: 0 })), // Мапваме масива options, за да създадем масив от обекти, всеки с id, текст на опцията и начален брой гласове 0.
      author: user?.name || 'Анонимен', // Вземаме името на автора от контекста user, или 'Анонимен', ако потребителят не е логнат.
    };

    try {
      // Изпращаме POST заявка към сървърния ендпойнт за създаване на анкета.
      await axios.post('http://localhost:5000/polls', pollData);
      alert('Анкетата беше създадена успешно!'); // Показваме съобщение за успех на потребителя.
      navigate('/polls'); // Пренасочваме потребителя към страницата със списък на анкетите.
    } catch (error) {
      // Ако има грешка при създаването на анкетата, извеждаме съобщение в конзолата и показваме съобщение за грешка на потребителя.
      console.error('Произошла грешка при създаването на анкетата:', error);
      alert('Грешка при създаване на анкета.');
    }
  };

  // JSX кодът, който описва как ще изглежда компонента в браузъра.
  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Създаване на анкета</h2>
      <form onSubmit={handleSubmit}> {/* Когато формата бъде изпратена, се извиква функцията handleSubmit. */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Въпрос:</label>
          <input
            type="text"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            value={question} // Стойността на полето за въпрос се контролира от състоянието question.
            onChange={handleQuestionChange} // При промяна на текста се извиква handleQuestionChange.
            placeholder="Напишете вашия въпрос тук"
            required // Полето е задължително.
          />
        </div>

        <label style={{ display: 'block', marginBottom: '5px' }}>Опции:</label>
        {options.map((option, index) => ( // Обхождаме масива options, за да рендерираме поле за всяка опция.
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              placeholder={`Опция ${index + 1}`}
              value={option} // Стойността на полето за опция се контролира от елемента на същия индекс в масива options.
              onChange={(event) => handleOptionChange(index, event)} // При промяна на текста се извиква handleOptionChange.
              required // Полето е задължително.
            />
          </div>
        ))}

        {options.length < 4 && ( // Показваме бутона "Добави опция" само ако броят на опциите е по-малък от 4.
          <button
            type="button"
            onClick={addOption} // При кликване се извиква функцията addOption.
            style={{ backgroundColor: '#f0f0f0', color: '#333', border: 'none', padding: '8px 15px', borderRadius: '3px', cursor: 'pointer', marginBottom: '15px' }}
          >
            Добави опция
          </button>
        )}

        <button
          type="submit"
          style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '3px', cursor: 'pointer', width: '100%' }}
        >
          Създай анкета
        </button>
      </form>
    </div>
  );
}

export default CreatePoll;
