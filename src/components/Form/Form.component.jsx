import React from 'react';
import './Form.styles.scss';

import {
  TextField,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@material-ui/core';

import { useForm, Controller } from 'react-hook-form';

import CustomButton from '../CustomButton/CustomButton.component';

const Form = ({ setTodos, todos }) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const today = date + ' ' + time;
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      task: '',
      category: '',
      deadline: '',
      priority: '1',
    },
  });
  const onSubmit = ({ task, category, deadline, priority }) => {
    setTodos([
      ...todos,
      {
        text: task,
        completed: false,
        dateCompleted: false,
        dateAdded: today,
        category: category,
        deadline: deadline,
        priority: priority,
        id: Math.random() * 1000,
      },
    ]);
  };

  const categoryList = [
    'Work',
    'Recreation',
    'Socializing',
    'Health',
    'Chores',
    'Learning',
  ];

  const priorityList = [
    'Normal',
    'Urgent',
    "Should've been done yesterday",
    'The fabric of spacetime might tear if this not done"',
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <div className="input-field">
          <TextField
            name="task"
            type="text"
            placeholder="Enter your task here..."
            inputRef={register}
          />
        </div>

        <Controller
          as={
            <Select>
              {categoryList.map((category, idx) => (
                <MenuItem key={idx} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          }
          control={control}
          name="category"
        />
        <div className="category"></div>

        <div>
          <Controller
            as={
              <RadioGroup name="priority">
                <FormLabel component="legend">Priority</FormLabel>
                {priorityList.map((label, idx) => (
                  <FormControlLabel
                    value={`${idx + 1}`}
                    key={idx}
                    control={<Radio color="primary" />}
                    label={label}
                  />
                ))}
              </RadioGroup>
            }
            name="priority"
            control={control}
          />
        </div>
        <div>
          <TextField
            id="datetime-local"
            label="Deadline"
            type="datetime-local"
            inputRef={register}
            name="deadline"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="add-button">
          <CustomButton type="submit">
            <i className="fas fa-plus-circle"></i>
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default Form;
