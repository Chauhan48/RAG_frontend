import React, { useState } from 'react';
import apiServices from '../services/apiService';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setResponseMessage('Please select a file first');
      return;
    }
    setLoading(true);
    const message = await apiServices.UploadFile(file);
    setLoading(false);
    setResponseMessage(message);
  };

  const handleUrl = async (e) => {
    e.preventDefault();
    if (!url) {
      setResponseMessage('Url field cannot be empty');
      return;
    }
    setLoading(true);
    const message = await apiServices.videoUrl(url);
    setLoading(false);
    setResponseMessage(message);
  };

  return (
    <>
      <h2>Upload Reference Files and Challenge Yourself with a Quiz</h2>

      {/* Place message on top */}
      {responseMessage && (
        <p style={{ margin: '1rem 0', fontWeight: '600', color: loading ? '#555' : '#000' }}>
          {responseMessage}
        </p>
      )}

      {/* Blur container when loading */}
      <div
        style={{
          display: 'flex',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '1rem',
          borderRadius: '8px',

          // Blur forms and disable interaction while loading
          filter: loading ? 'blur(4px)' : 'none',
          pointerEvents: loading ? 'none' : 'auto',
          userSelect: loading ? 'none' : 'auto',
          transition: 'filter 0.3s ease',
        }}
      >
        <form onSubmit={handleUpload} style={{ marginRight: '2rem' }}>
          <label>Please Upload PDF only</label>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>

        <form onSubmit={handleUrl} style={{ width: '400px' }}>
          <label>Youtube video URL</label>
          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=ER5t_E6s_yI"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      {loading && <p style={{ marginTop: '1rem' }}>AI is processing the data...</p>}

      <br /> <br />
      <button onClick={() => navigate('/topics')} >
        Start Quiz
      </button>
    </>
  );
}

