import React, { useState, useEffect } from 'react';
import './App.css';

import Form from './components/Form/Form.component';
import TodoList from './components/TodoList/TodoList.component';
import TreeMap from './components/TreeMap/TreeMap.component';
import Treemap2 from './components/treemap2/treemap2.component';
import Legend from './components/Legend/Legend.component';

import Card from '@material-ui/core/Card';

function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  };
  const dataset = {
    name: 'TODO',
    children: [
      {
        name: 'Work',
        children: [
          { name: 'Easing', value: 17010 },
          { name: 'FunctionSequence', value: 5842 },
          { name: 'ISchedulable', value: 1041 },
          { name: 'Parallel', value: 5176 },
          { name: 'Pause', value: 449 },
          { name: 'Scheduler', value: 5593 },
          { name: 'Sequence', value: 5534 },
          { name: 'Transition', value: 9201 },
          { name: 'Transitioner', value: 19975 },
          { name: 'TransitionEvent', value: 1116 },
          { name: 'Tween', value: 6006 },
        ],
      },
      {
        name: 'Recreation',
        children: [
          { name: 'FunctionSequence', value: 5842 },
          { name: 'ISchedulable', value: 1041 },
          { name: 'Parallel', value: 5176 },
          { name: 'Scheduler', value: 5593 },
          { name: 'Sequence', value: 5534 },
          { name: 'Transition', value: 9201 },
          { name: 'TransitionEvent', value: 1116 },
          { name: 'Tween', value: 6006 },
        ],
      },
      {
        name: 'Socializing',
        children: [
          { name: 'DataField', value: 1759 },
          { name: 'DataSchema', value: 2165 },
          { name: 'DataSet', value: 586 },
          { name: 'DataSource', value: 3331 },
          { name: 'DataTable', value: 772 },
          { name: 'DataUtil', value: 3322 },
        ],
      },
      {
        name: 'Health',
        children: [
          { name: 'DirtySprite', value: 8833 },
          { name: 'LineSprite', value: 1732 },
          { name: 'RectSprite', value: 3623 },
          { name: 'TextSprite', value: 10066 },
        ],
      },
      {
        name: 'Chores',
        children: [{ name: 'FlareVis', value: 4116 }],
      },
      {
        name: 'Learning',
        children: [
          { name: 'DragForce', value: 1082 },
          { name: 'GravityForce', value: 1336 },
          { name: 'IForce', value: 319 },
          { name: 'NBodyForce', value: 10498 },
          { name: 'Particle', value: 2822 },
          { name: 'Simulation', value: 9983 },
          { name: 'Spring', value: 2213 },
          { name: 'SpringForce', value: 1681 },
        ],
      },
    ],
  };

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  return (
    <div className="App">
      <header>
        <h1>Toodles</h1>
      </header>

      <Card>
        <div className="form">
          <Form todos={todos} setTodos={setTodos} />
        </div>
      </Card>

      <Card>
        <div className="treemap">
          <TreeMap width="1225" height="800" data={dataset} />
        </div>
      </Card>
      <Card>
        {' '}
        <Legend height="400" />
      </Card>

      <Card>
        <div className="todo-list">
          <TodoList
            todos={todos}
            setTodos={setTodos}
            setStatus={setStatus}
            status={status}
            filteredTodos={filteredTodos}
          />
        </div>
      </Card>

      {/* <Treemap2 width="1225" height="800" data={dataset} /> */}
    </div>
  );
}

export default App;
