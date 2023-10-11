import React, { useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import './App.css';
import Filter from './components/Filter';
import Logo from './assets/logo.png'

//Components
import TodoList from './components/ToDo';
import { useGlobalContext } from './context/appContext';



function App() {
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditId] = useState(null);

  const { tasks, setTasks, filterdTasks} = useGlobalContext();

  const handleAddItems = (e) => {
    e.preventDefault();
    if (!text) {
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
    <>
        
      <nav className="navbar">
        <div className="navbar-left">
          <span className="app-title">To-do App</span>
        </div>
        <div className="navbar-right">
          <span className="github-username">
            Faisal Irfan <br></br> Email : faisalirfan2502@gmail.com 
          </span>
        </div>
      </nav>
   
    <div className="center-box">
      <div className="header">
      <div className="wa__logo-area">
            <img alt="to do list" src={Logo} width="40%" />
          </div>
        
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
    </>
  );
}

export default App;
