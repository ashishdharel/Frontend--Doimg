import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
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
      alert('Error fetching data. See console for details.');
    }
  };

  const handleSubmit = async (name, description) => {
    try {
      await axios.post('http://47.129.53.171:5000/api/data', { name, description });
      alert('Data added successfully!');
      fetchData(); // Refresh data after adding
    } catch (error) {
      console.error('Error adding data:', error);
      alert('Error adding data');
    }
  };

  return (
    <div className="App">
      <h1>Fetch and Add Data Example</h1>

      {/* Form to add data */}
      <form onSubmit={(e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const description = e.target.description.value;
        handleSubmit(name, description);
        e.target.reset();
      }}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="description" placeholder="Description" required />
        <button type="submit">Add Data</button>
      </form>

      {/* Display fetched data */}
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
