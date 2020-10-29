import React from 'react';
import './Todo.styles.scss';
const Todo = ({ setTodos, allTodos, todo }) => {
  const deleteHandler = () => {
    setTodos(allTodos.filter((el) => el.id !== todo.id));
  };
  const completeHandler = () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const today = date + ' ' + time;
    setTodos(
      allTodos.map((item) => {
        if (item.id === todo.id) {
          if (item.completed) {
            return {
              ...item,
              completed: !item.completed,
              dateCompleted: false,
            };
          } else {
            return {
              ...item,
              completed: !item.completed,
              dateCompleted: today,
            };
          }
        }
        return item;
      })
    );
  };
  return (
    <div className="todo">
      <li className={`${todo.completed ? 'completed' : ''} todo-item`}>
        {' '}
        <p>{todo.text}</p>
        <p>{todo.category}</p>
      </li>
      <button onClick={completeHandler} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};
export default Todo;
