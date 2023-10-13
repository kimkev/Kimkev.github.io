import React from 'react';

const Sorting = ({ setFilterText }) => {
  return (
    <input
      type="text"
      placeholder="Filter data"
      onChange={(e) => setFilterText(e.target.value)}
    />
  );
}

export default Sorting;