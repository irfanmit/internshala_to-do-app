import { createContext, useContext, useEffect, useState } from 'react';

const appContext = createContext();

const getLocalStorage = () => {
    let task = localStorage.getItem('task');
    if (task) {
        return JSON.parse(task);
    } else {
        return [];
    }
};



const AppProvider = ({ children }) => {

    const showAlert = (show = false, msg = '', type = '') => {
        setAlert({ show, msg, type });
      };


    const [tasks, setTasks] = useState(getLocalStorage());
    const [filteredText, setFilteredText] = useState('all');
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

    const filterdTasks = tasks.filter((task) => {
        if (filteredText === 'completed') {
          return task.complete === true;
        } else if (filteredText === 'uncompleted') {
          return task.complete === false;
        } else {
          return task;
        }
      });
      const completeHandler = (id) => {
        setTasks(
          tasks.map((item) => {
            if (item.id === id) {
              return { ...item, complete: true };
            }
    
            // Task Complete alert
            showAlert(true, 'Task Completed !', 'complete');
    
            return item;
          })
        );
      };
    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <appContext.Provider
            value={{
                tasks,
                setTasks,
                filterdTasks,
                filteredText,
                setFilteredText,
                alert,
                completeHandler,
                setAlert,
                showAlert,
            }}
        >
            {children}
        </appContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(appContext);
};

export { AppProvider, useGlobalContext };
