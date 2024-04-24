import React, { useState, useEffect } from 'react';
import './App.css';
const App = () => {
  // Load initial data from local storage or use a default value
  const initialData = JSON.parse(localStorage.getItem('data')) || [
    { id: 1, name: 'John Doe', age: 25, email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', age: 30, email: 'jane.smith@example.com' },
    { id: 3, name: 'Alice Johnson', age: 35, email: 'alice.johnson@example.com' }
  ];

  const [data, setData] = useState(initialData);

  // Function to handle input changes
  function handleInputChange(id, column, value) {
    const updatedData = data.map(row =>
      row.id === id ? { ...row, [column]: value } : row
    );
    setData(updatedData);
  }

  // Function to prepare data for API
  function prepareDataForApi() {
    return data.map(row => ({
      id: row.id,
      name: row.name,
      age: row.age,
      email: row.email
    }));
  }

  // Save data to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  return (
    <>
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <input
                    type="text"
                    value={row.name}
                    onChange={e => handleInputChange(row.id, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.age}
                    onChange={e => handleInputChange(row.id, 'age', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.email}
                    onChange={e => handleInputChange(row.id, 'email', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => console.log(prepareDataForApi())}>
          Prepare Data for API
        </button>
      </div>
    </>
  );
}

export default App;
