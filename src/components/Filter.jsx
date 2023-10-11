import React from 'react';
import { useGlobalContext } from '../context/appContext';

const Filter = () => {
  const { setFilteredText } = useGlobalContext();

  const onFilterChange = (e) => {
    setFilteredText(e.target.value);
  };

  return (
    <div>
      <label>Filter: </label>
      <select onChange={onFilterChange}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncomplete</option>
      </select>
    </div>
  );
};

export default Filter;