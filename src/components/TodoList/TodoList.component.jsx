import React from 'react';
import './TodoList.styles.scss';
import {
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
} from '@material-ui/core';

import Todo from '../Todo/Todo.component';

const TodoList = ({ todos, setTodos, filteredTodos, status, setStatus }) => {
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };
  return (
    <div>
      <div>
        <RadioGroup name="todos" onChange={statusHandler} value={status}>
          <FormLabel component="legend">Tasks</FormLabel>
          <FormControlLabel
            control={<Radio color="primary" />}
            value="all"
            label="All"
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            value="completed"
            label="Completed"
          />
          <FormControlLabel
            control={<Radio color="primary" v />}
            value="uncompleted"
            label="Uncompleted"
          />
        </RadioGroup>
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
