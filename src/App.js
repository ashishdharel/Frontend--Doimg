// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://47.129.53.171:5000/api/data', { name, description });
      alert('Data added successfully!');
      setName('');
      setDescription('');
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
    </div>
  );
}

export default App;
