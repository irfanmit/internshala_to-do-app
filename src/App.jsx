import React, { useState, useRef } from 'react';
import { BsPencil } from 'react-icons/bs';
import './App.css';
import Filter from './components/Filter';

// 
import TodoList from './components/ToDo';
import { useGlobalContext } from './context/appContext';
import Alert from './components/Alert';


// 
function App() {
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditId] = useState(null);
  const editRef = useRef();

  const { tasks, setTasks, filterdTasks, alert, setAlert, showAlert} = useGlobalContext();

  const handleAddItems = (e) => {
    e.preventDefault();
    if (!text) {
      // if input is empty
      // showAlert(true, 'Field is required!', 'danger');
    } else if (text && isEditing) {
      // Update the item & states
      const updatedTasks = tasks.map((item) => {
        if (item.id === editID) {
          return {
            ...item,
            title: text,
            createdAt: new Date(),
            complete: false
          };
        } else {
          return item;
        }
      });
      setTasks(updatedTasks);
      setText('');
      setEditId(null);
      setIsEditing(false);

      // Update item alert
      // setAlert({ show: true, msg: 'Updated Successfully!', type: 'success' });
    } else {
      // Add item
      const newTask = {
        id: tasks.length + 1,
        createdAt: new Date(),
        complete: false,
        title: text
      };
      setTasks([newTask, ...tasks]);
      setText('');
    }
  };

  const editHandler = (id) => {
    const spesificItem = tasks.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setText(spesificItem.title);
  };


  return (
    <div className="center-box">
      <div className="header">
        <div className="icon">Icon</div>
        
      {/* setAlert({ show: true, msg: 'Updated Successfully!', type: 'success' }); */}
        <div className="filter-button">
          <Filter/>
        </div>
      </div>
      <div className="white-board">
      {filterdTasks.length > 0 ? (
            <TodoList editHandler={editHandler} filterdTasks={filterdTasks} />
          ) : (
            <p className="wa__empty">No item found!</p>
          )}
      </div>
      <div className="input-container">
        <span>
          <BsPencil fill="#fff" />
        </span>
        <input
          type="text"
          className="input-field"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="add-button" onClick={handleAddItems}>
        {isEditing ? 'Update' : 'Add Item'}
        </div>
      </div>
    </div>
  );
}

export default App;
