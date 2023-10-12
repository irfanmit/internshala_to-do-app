import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsCheckAll, BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useGlobalContext } from '../context/appContext';
import { formatDate } from '../helper/dateFormater';

const TodoList = ({ filterdTasks, editHandler }) => {
  const { completeHandler, removeItem, removeAllItems } = useGlobalContext();
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);

  const openDeleteAllModal = () => {
    setIsDeleteAllModalOpen(true);
  };

  const closeDeleteAllModal = () => {
    setIsDeleteAllModalOpen(false);
  };

  return (
    <>
      <table className="wa__list-area">
        <thead className="wa__table-header">
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filterdTasks.map((item, index) => {
            const { id, createdAt, title, complete } = item;

            return (
              <tr key={index}>
                <td width="">{index === 0 ? 1 + '.' : index + 1 + '.'}</td>
                <td width="100%">
                  <p className={`wa__item ${complete ? 'completed' : ''}`}>{title}</p>
                </td>
                <td>
                  <p className="wa__date">{formatDate(createdAt)}</p>
                </td>
                <td>
                  {complete ? (
                    <span className="status completed">Completed</span>
                  ) : (
                    <span className="status active">Active</span>
                  )}
                </td>
                <td className="" width="">
                  <div className="wa__action">
                    <button
                      className={`wa__btn wa__action-btn wa__complete-btn ${
                        complete ? 'wa__task-completed' : ''
                      }`}
                      disabled={complete ? true : false}
                      title="Complete"
                      onClick={() => {
                        completeHandler(id);
                      }}
                    >
                      {complete ? <BsCheckAll /> : <AiOutlineCheck />}
                    </button>
                    <button
                      className="wa__btn wa__action-btn wa__update-btn"
                      title="Edit"
                      onClick={() => {
                        editHandler(id);
                      }}
                    >
                      <BsPencilSquare />
                    </button>
                    <button
                      className="wa__btn wa__action-btn wa__delete-btn"
                      title="Delete"
                      onClick={() => {
                        removeItem(id);
                      }}
                    >
                      <BsTrash />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        {filterdTasks.length > 1 && (
          <tfoot>
            <tr>
              <td colSpan={5}>
                <button className="wa__btn wa__delete-all" onClick={openDeleteAllModal}>
                  Delete All
                </button>
              </td>
            </tr>
          </tfoot>
        )}
      </table>

      {/* MODAL TO CONFIRM ALL DELETION */}

      {isDeleteAllModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete all items?</p>
            <div className="modal-actions">
              <button
                onClick={() => {
                  removeAllItems();
                  closeDeleteAllModal();
                }}
              >
                Yes
              </button>
              <button onClick={closeDeleteAllModal}>No</button>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
};

export default TodoList;
