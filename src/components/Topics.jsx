import React, { useEffect, useState } from 'react'
import apiServices from '../services/apiService'

const Topics = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        async function fetchTopics() {
            const result = await apiServices.topics();
            setTopics(result.topics);
        }
        fetchTopics();
    }, [])

    const handleClick = () => {

    }

    return (
        <div>
            <h1>What topic will you Conquer?</h1>
            <select
                id="dropdown"
                name="dropdown"
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
