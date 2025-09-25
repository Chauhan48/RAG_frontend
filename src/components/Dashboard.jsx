import React from 'react';

const Dashboard = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      {/* Left side: File upload */}
      <div
        style={{
          flex: 1,
          border: '2px dashed #646cff',
          borderRadius: '10px',
          padding: '2rem',
          textAlign: 'center',
          color: '#646cff',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => alert('Implement file upload here')}
      >
        <p>Upload your references</p>
        <input 
          type="file" 
          style={{ display: 'none' }} 
          id="file-upload" 
        />
        {/* You can enhance this with drag and drop or button to trigger file input */}
        <button
          onClick={e => {
            e.stopPropagation(); // prevent triggering parent div click if needed
            document.getElementById('file-upload').click();
          }}
          style={{
            backgroundColor: '#646cff',
            border: 'none',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          Choose File
        </button>
      </div>

      {/* Right side: Input field with text box */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Enter text here..."
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1.5px solid #646cff',
            fontSize: '1rem',
            outline: 'none',
          }}
        />
        <textarea
          placeholder="Additional details..."
          rows={6}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1.5px solid #646cff',
            fontSize: '1rem',
            outline: 'none',
            resize: 'vertical',
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
