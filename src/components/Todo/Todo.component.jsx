import React from 'react';
import './Todo.styles.scss';
const Todo = ({ setTodos, allTodos, todo }) => {
  const deleteHandler = () => {
    setTodos(allTodos.filter((el) => el.id !== todo.id));
  };
  const completeHandler = () => {
    setTodos(
      allTodos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
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
