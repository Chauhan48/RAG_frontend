import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiServices from '../services/apiService';

export default function Questions() {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState([]); // Array to track correctness per question
  const [showHint, setShowHint] = useState(false);

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
    setShowHint(false);
    setSelectedOptionId(null);
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (selectedOptionId === null) return; // Prevent next if no option selected

    const selectedOption = currentQuestion.options.find(opt => opt._id === selectedOptionId);
    const isCorrect = selectedOption?.isCorrect || false;

    // Update answeredCorrectly array for current question
    const updatedAnswers = [...answeredCorrectly];
    updatedAnswers[currentIndex] = isCorrect;
    setAnsweredCorrectly(updatedAnswers);

    // Show hint for next question only if current question was answered incorrectly
    setShowHint(!isCorrect);

    // Reset selected option for next question
    setSelectedOptionId(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

const handleSubmit = async () => {
  // Record the answer for the current (last) question
  if (selectedOptionId !== null) {
    const selectedOption = currentQuestion.options.find(opt => opt._id === selectedOptionId);
    const isCorrect = selectedOption?.isCorrect || false;
    
    const updatedAnswers = [...answeredCorrectly];
    updatedAnswers[currentIndex] = isCorrect;
    setAnsweredCorrectly(updatedAnswers);

    // Calculate final scores
    const correctCount = updatedAnswers.filter(Boolean).length;
    const scorePercentage = (correctCount / questions.length) * 100;
    const incorrectQuestions = questions
      .filter((_, i) => !updatedAnswers[i])
      .map(q => q._id);

    const progressData = { scorePercentage, incorrectQuestions };

    const result = await apiServices.submitProgress(progressData);

    if (result.success) {
      alert(`Quiz completed! Score: ${scorePercentage.toFixed(1)}% (${correctCount}/${questions.length} correct)\n${result.message}`);
      navigate('/dashboard');
    } else if (result.needsAuth) {
      alert('Your session has expired. Please log in again.');
      navigate('/'); // or wherever your login page is
    } else {
      alert('Failed to submit progress: ' + result.message);
    }
  }
};



  // Determine if hint should be shown:
  // Don't show for the first question,
  // For others, show only if user was incorrect on previous
  const shouldShowHint = currentIndex > 0 && showHint;

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

      <div style={{ marginBottom: '1rem' }}>
        {currentQuestion.options.map(option => (
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

      {shouldShowHint && (
        <div
          style={{
            marginBottom: '1rem',
            backgroundColor: '#44475a',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            color: '#f1fa8c',
            fontStyle: 'italic',
          }}
        >
          Hint: {currentQuestion.hint}
        </div>
      )}

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
            disabled={selectedOptionId === null}
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
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={selectedOptionId === null}
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
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
