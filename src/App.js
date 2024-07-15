import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file

function App() {
    const [inputData, setInputData] = useState('');
    const [inputDescription, setInputDescription] = useState('');
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

    const handleInputChange1 = (e) => {
        setInputData(e.target.value);
    };

    const handleInputChange2 = (e) => {
        setInputDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputData.trim() || !inputDescription.trim()) {
            console.log('Input is empty, skipping submit.');
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/storedata`, {
                data: inputData,
                description: inputDescription
            });
            setInputData('');
            setInputDescription('');
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
                <div>
                    <input
                        type="text"
                        value={inputData}
                        onChange={handleInputChange1}
                        placeholder="Enter data to store"
                        className="input-field"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={inputDescription}
                        onChange={handleInputChange2}
                        placeholder="Enter description to data"
                        className="input-field"
                    />
                </div>
                <button type="submit" className="store-button">Store Data</button>
            </form>
            <h2>Stored Data:</h2>
            <div className="data-grid">
                {storedData.map((item) => (
                    <div key={item.id} className="data-item">
                        <p>Data: {item.data}</p>
                        <p>Description: {item.description}</p>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;