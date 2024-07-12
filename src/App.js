import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file

function App() {
    const [inputData, setInputData] = useState('');
    const [storedData, setStoredData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getdata`);
            setStoredData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (e) => {
        setInputData(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputData.trim()) {
            console.log('Input is empty, skipping submit.');
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/storedata`, { data: inputData });
            setInputData('');
            fetchData();
        } catch (error) {
            console.error('Error storing data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/deletedata/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <div className="app-container">
            <h1>Store and Fetch Data Example</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputData}
                    onChange={handleInputChange}
                    placeholder="Enter data to store"
                    className="input-field"
                />
                <button type="submit" className="store-button">Store Data</button>
            </form>
            <h2>Stored Dataa:</h2>
            <div className="data-grid">
                {storedData.map((item) => (
                    <div key={item.id} className="data-item">
                        <p>{item.data}</p>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;