import React, { useState } from 'react';
import apiServices from '../services/apiService';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setResponseMessage('Please select a file first');
      return;
    }
    const message = await apiServices.UploadFile(file);
    setResponseMessage(message);
  };

  const handleUrl = async (e) => {
    e.preventDefault();
  }

  return (
    <>
      <h2>Upload Reference Files and Challenge Yourself with a Quiz</h2>
      <div style={{ display: 'flex' }}>
        <form onSubmit={handleUpload} >
          <label>Please Upload PDF only</label>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">
            Upload
          </button>
          {responseMessage && <p>{responseMessage}</p>}
        </form>
        <form onSubmit={handleUrl} style={{ width: '400px' }} >
          <label>Youtube video URL</label>
          <input type="text" placeholder='https://www.youtube.com/watch?v=ER5t_E6s_yI' onChange={handleFileChange} />
          <button type="submit" >
            Submit
          </button>
          {responseMessage && <p>{responseMessage}</p>}
        </form>
      </div>
    </>
  );
}
