import React, { useEffect, useState } from 'react'
import apiServices from '../services/apiService'
import { useNavigate } from 'react-router-dom';

const Topics = () => {
    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTopics() {
            const result = await apiServices.topics();
            setTopics(result.topics);
            setTopic(result.topics[0] || '');
        }
        fetchTopics();
    }, [])

    const handleClick = () => {
        async function questionList() {
            const result = await apiServices.questions(topic);
            console.log(result);
        }
        questionList();
        navigate('/questions');
    }

    return (
        <div style={{
            display: 'flex',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '1rem',
            borderRadius: '8px',
            display: 'relative',
            margin: '5%'
        }} >
            <h1>What topic will you Conquer?</h1>
            <select
                id="dropdown"
                name="dropdown"
                onChange={e => setTopic(e.target.value)}
                style={{
                    appearance: 'none',
                    backgroundColor: '#1e1e1e',
                    color: '#eee',
                    border: '1.5px solid #646cff',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    width: '240px',
                    outline: 'none',
                }}
            >
                {topics.map(it => (
                    <option key={it} value={it}>{it}</option>
                ))}
            </select>

            <br /> <br />
            <button onClick={handleClick}>Begin Test</button>
        </div>
    )
}

export default Topics
