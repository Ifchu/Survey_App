// Updated by Velislav on 3.05
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function CreatePoll() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']); // минимум 2
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, '']);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pollData = {
      question,
      options: options.map((opt, i) => ({
        id: i + 1,
        text: opt,
        votes: 0
      })),
      author: user?.name || 'Анонимен'
    };

    try {
      await axios.post('http://localhost:5000/polls', pollData);
      alert('Анкетата е създадена успешно!');
      navigate('/polls');
    } catch (error) {
      console.error('Грешка при създаване на анкета:', error);
      alert('Грешка при създаване на анкета.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-center">Създай анкета</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Въпрос:</label>
            <input
              type="text"
              className="form-control"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Какво мислите по темата..."
              required
            />
          </div>

          <label className="form-label">Опции:</label>
          {options.map((opt, index) => (
            <div className="mb-2" key={index}>
              <input
                type="text"
                className="form-control"
                placeholder={`Опция ${index + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
            </div>
          ))}

          {options.length < 4 && (
            <button
              type="button"
              onClick={addOption}
              className="btn btn-outline-secondary btn-sm mb-3"
            >
              ➕ Добави още опция
            </button>
          )}

          <button type="submit" className="btn btn-success w-100">
            ✅ Създай анкета
          </button>
        </form>
      </div>
    </div>
  );
}
export default CreatePoll;