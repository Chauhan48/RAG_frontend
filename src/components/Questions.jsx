import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Questions() {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [hint, setHint] = useState(false);

  if (!questions.length) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p>No questions found. Please select a topic and start the test.</p>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handlePrevious = () => {
    setSelectedOptionId(null); // reset selection when navigating
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    setSelectedOptionId(null); // reset selection when navigating
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleSubmit = () => {
    alert('Test submitted!');
    // Add your submit logic here
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '1rem',
        backgroundColor: '#1f1f1f',
        color: '#eee',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(100, 108, 255, 0.4)',
      }}
    >
      <h2 style={{ marginBottom: '1rem', color: '#646cff' }}>
        Question {currentIndex + 1} of {questions.length}
      </h2>
      <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
        {currentQuestion.questionText}
      </p>

      <div style={{ marginBottom: '2rem' }}>
        {currentQuestion.options.map((option) => (
          <label
            key={option._id}
            style={{
              display: 'block',
              padding: '0.6rem 1rem',
              marginBottom: '0.5rem',
              borderRadius: '8px',
              border: selectedOptionId === option._id ? '2px solid #646cff' : '1.5px solid #444',
              backgroundColor: selectedOptionId === option._id ? '#3a3a72' : '#2c2c2c',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <input
              type="radio"
              name="option"
              value={option._id}
              checked={selectedOptionId === option._id}
              onChange={() => setSelectedOptionId(option._id)}
              style={{ marginRight: '0.75rem', cursor: 'pointer' }}
            />
            {option.text}
          </label>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            border: 'none',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            opacity: currentIndex === 0 ? 0.5 : 1,
            backgroundColor: '#646cff',
            color: '#fff',
            fontWeight: '600',
            fontSize: '1rem',
          }}
        >
          Previous
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={handleNext}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: '#646cff',
              color: '#fff',
              fontWeight: '600',
              fontSize: '1rem',
            }}
            disabled={!selectedOptionId} // disable if no option selected
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: '#4caf50',
              color: '#fff',
              fontWeight: '600',
              fontSize: '1rem',
            }}
            disabled={!selectedOptionId} // disable if no option selected
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
