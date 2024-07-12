// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://47.129.53.171:5000/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://47.129.53.171:5000/api/data', { name, description });
      alert('Data added successfully!');
      setName('');
      setDescription('');
      fetchData(); // Fetch updated data after adding
    } catch (error) {
      console.error('Error adding data:', error);
      alert('Error adding data');
    }
  };

  return (
    <div className="App">
      <h1>Add Data to MySQL via React and Node.js</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Data</button>
      </form>

      <h2>Stored Data:</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>Name:</strong> {item.name}, <strong>Description:</strong> {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
