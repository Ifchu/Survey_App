import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Polls() {
  const [polls, setPolls] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await axios.get('http://localhost:5000/polls');
      setPolls(response.data);
    } catch (error) {
      console.error('Грешка при зареждане:', error);
    }
  };

  const hasVoted = (pollId) => {
    const voted = JSON.parse(localStorage.getItem('voted') || '{}');
    return !!voted[pollId];
  };

  const markVoted = (pollId) => {
    const voted = JSON.parse(localStorage.getItem('voted') || '{}');
    voted[pollId] = true;
    localStorage.setItem('voted', JSON.stringify(voted));
  };

  const handleVote = async (pollId, optionId) => {
    if (!user) {
      alert('Влезте, за да гласувате.');
      return;
    }
    if (hasVoted(pollId)) {
      alert('Вече гласувахте.');
      return;
    }

    const updatedPolls = polls.map(poll =>
      poll.id === pollId
        ? {
            ...poll,
            options: poll.options.map(option =>
              option.id === optionId ? { ...option, votes: option.votes + 1 } : option
            ),
          }
        : poll
    );

    try {
      await axios.patch(`http://localhost:5000/polls/${pollId}`, {
        options: updatedPolls.find(p => p.id === pollId).options,
      });
      markVoted(pollId);
      setPolls(updatedPolls);
    } catch (error) {
      console.error('Грешка при гласуване:', error);
    }
  };

  const handleDelete = async (pollId) => {
    if (!window.confirm('Сигурни ли сте?')) return;
    try {
      await axios.delete(`http://localhost:5000/polls/${pollId}`);
      setPolls(polls.filter(poll => poll.id !== pollId));
    } catch (error) {
      console.error('Грешка при изтриване:', error);
    }
  };

  return (
    // Основен контейнер за целия компонент.
    <div style={{ margin: '20px auto', maxWidth: '800px', padding: '20px' }}>
      {/* Заглавие на страницата с анкетите. */}
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Анкети</h1>

      {/* Условно рендериране: ако няма анкети, показва съобщение. */}
      {polls.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f0f0f0' }}>Няма анкети.</div>
      ) : (
        // Ако има анкети, итерираме през всяка една и я показваме.
        polls.map(poll => (
          // Контейнер за всяка отделна анкета.
          <div key={poll.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px' }}>
            {/* Въпрос на анкетата. */}
            <h5 style={{ marginBottom: '10px' }}>{poll.question}</h5>
            {/* Неупорядъчен списък за опциите на анкетата. */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {/* Итерираме през всяка опция на текущата анкета. */}
              {poll.options.map(option => (
                // Елемент от списъка за всяка опция, показващ текста и бутон за гласуване.
                <li key={option.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  {/* Текст на опцията. */}
                  <span>{option.text}</span>
                  {/* Контейнер за броя гласове и бутона за гласуване. */}
                  <span>
                    {/* Показва броя гласове за тази опция. */}
                    <span style={{ backgroundColor: '#007bff', color: 'white', padding: '5px 10px', borderRadius: '3px', marginRight: '10px' }}>
                      {option.votes}
                    </span>
                    {/* Бутон за гласуване за тази опция. Деактивиран е, ако потребителят вече е гласувал. */}
                    <button
                      onClick={() => handleVote(poll.id, option.id)}
                      disabled={hasVoted(poll.id)}
                      style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
                    >
                      Гласувай
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            {/* Условно рендериране: ако потребителят е администратор, показва бутон за изтриване. */}
            {user?.name === 'admin' && (
              <button onClick={() => handleDelete(poll.id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '3px', marginTop: '15px', cursor: 'pointer' }}>
                Изтрий
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Polls
