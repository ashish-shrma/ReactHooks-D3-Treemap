import React from 'react';
import './TodoList.styles.scss';
import { Select, MenuItem } from '@material-ui/core';

import Todo from '../Todo/Todo.component';

const TodoList = ({ todos, setTodos, filteredTodos, status, setStatus }) => {
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };
  return (
    <div>
      <div className="select">
        <Select name="todos" onChange={statusHandler} value={status}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="uncompleted">Uncompleted</MenuItem>
        </Select>
      </div>
      <ul>
        {filteredTodos.map((todo, idx) => (
          <Todo
            todo={todo}
            key={todo.id}
            allTodos={todos}
            setTodos={setTodos}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
