// Updated by Velislav on 3.05
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
      const res = await axios.get('http://localhost:5000/polls');
      setPolls(res.data);
    } catch (error) {
      console.error('Грешка при зареждане на анкети:', error);
    }
  };

  const hasVoted = (pollId) => {
    const voted = JSON.parse(localStorage.getItem('voted') || '{}');
    return voted[pollId];
  };

  const markVoted = (pollId) => {
    const voted = JSON.parse(localStorage.getItem('voted') || '{}');
    voted[pollId] = true;
    localStorage.setItem('voted', JSON.stringify(voted));
  };

  const handleVote = async (pollId, optionId) => {
    if (!user) {
      alert('Моля, влезте в системата, за да гласувате.');
      return;
    }

    if (hasVoted(pollId)) {
      alert('Вече сте гласували в тази анкета.');
      return;
    }

    const poll = polls.find(p => p.id === pollId);
    const updatedOptions = poll.options.map(opt =>
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );

    try {
      await axios.patch(`http://localhost:5000/polls/${pollId}`, {
        options: updatedOptions
      });
      markVoted(pollId);
      fetchPolls(); // обновяване
    } catch (error) {
      console.error('Грешка при гласуване:', error);
    }
  };

  const handleDelete = async (pollId) => {
    const confirmDelete = window.confirm('Сигурни ли сте, че искате да изтриете анкетата?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/polls/${pollId}`);
      fetchPolls();
    } catch (error) {
      console.error('Грешка при изтриване на анкета:', error);
    }
  };

 return (
  <div className="container mt-5">
    <h1 className="mb-4 text-center">Анкети</h1>

    {polls.length === 0 ? (
      <div className="alert alert-info text-center">
        Няма налични анкети.
      </div>
    ) : (
      polls.map(poll => (
        <div key={poll.id} className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{poll.question}</h5>

            <ul className="list-group list-group-flush mb-3">
              {poll.options.map(option => (
                <li
                  key={option.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {option.text}
                  <span>
                    <span className="badge bg-primary me-2">
                      {option.votes} гласа
                    </span>
                    <button
                      onClick={() => handleVote(poll.id, option.id)}
                      className="btn btn-sm btn-outline-primary"
                      disabled={hasVoted(poll.id)}
                    >
                      Гласувай
                    </button>
                  </span>
                </li>
              ))}
            </ul>

            {user?.name === 'admin' && (
              <button
                onClick={() => handleDelete(poll.id)}
                className="btn btn-sm btn-danger"
              >
                Изтрий анкетата
              </button>
            )}
          </div>
        </div>
      ))
    )}
  </div>
);
}

export default Polls;
