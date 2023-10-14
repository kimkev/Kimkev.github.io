import React, { useState, useEffect } from 'react';
import DataTable from './DataTable.js';
import './ListApp.css';


const ListApp = () => {

  const [data, setData] = useState([]);
  const [sortingOption, setSortingOption] = useState('name'); // Default sorting option
  const [columns, setColumns] = useState([]);
  const [title, setTitle] = useState('');
  const [disabled, setDisabled] = useState(false);


  const currentYear = new Date().getFullYear()


  const fetchData = async (apiEndpoint, dataTitle) => {
    // disable mass clicking of fetch button
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 3000);

    try {
      const response = await fetch(apiEndpoint);
      const jsonData = await response.json();
      // some API endpoints share inside results
      if (jsonData.results){
        setData(jsonData.results);
      }else {
        setData(jsonData);
      }
      setTitle(dataTitle);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Function to sort data based on the selected sorting option
  const sortData = (sortingOption) => {
    const sortedData = [...data];
    // sortedData.sort((a, b) => a[sortingOption].localeCompare(b[sortingOption]));
    sortedData.sort((a, b) => {
      const columnA = a[sortingOption];
      const columnB = b[sortingOption];

      if (columnA < columnB) {
        return -1;
      }
      if (columnA > columnB) {
        return 1;
      }
      return 0;
    });

    setData(sortedData);
  };


  useEffect(() => {
      // Dynamically generate columns based on the API data keys
      if (data.length > 0) {
        setColumns(Object.keys(data[0]));
        setSortingOption(Object.keys(data[0])[0]); // Default sorting option based on the first column
      }
  }, [data]);


  return (
    <>
      <div className="container-lists">
        <div>
          <h2>Lists</h2>
          <div>
            <button
              onClick={() => fetchData('https://jsonplaceholder.typicode.com/posts', 'Sample Users')}
              disabled={disabled}
            >
              Sample Users
            </button>
            <button
              onClick={() => fetchData(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/ca`, `${currentYear} Canadian Holidays`)}
              disabled={disabled}
            >
              {currentYear} Canadian Holidays
            </button>
            <button
              onClick={() => fetchData(`https://opentdb.com/api.php?amount=10`, `Trivias`)}
              disabled={disabled}
            >
              Trivias
            </button>
          </div>
        </div>

        <div>
          <div className='container-sort'>
            <h2>{title}</h2>
            <div>
              <label>Sort By </label>
              <select className='custom-select' onChange={(e) => sortData(e.target.value)}>
                {columns.map(column => (
                  <option key={column} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <DataTable data={data} columns={columns} />
          </div>
        </div>
      </div>
    </>

  );
};

export default ListApp;