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
import { makeStyles } from '@material-ui/core/styles';

import { useForm, Controller } from 'react-hook-form';

import CustomButton from '../CustomButton/CustomButton.component';

const useStyles = makeStyles({
  root: {
    width: '100%',
    fontFamily: 'inherit',
    fontSize: '20px',
  },
  dropdown: {
    width: '100%',
  },
  radio: {
    flexDirection: 'row',
    flexWrap: 'initial',
  },
  label: {
    position: 'absolute',
    fontSize: '12px',
    margin: '0 1em 0 0',
  },
});

const Form = ({ setTodos, todos }) => {
  const classes = useStyles();
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
    'The fate of entire humanity depends on this',
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <div className="input-field">
          <FormLabel component="legend" className={classes.label}>
            Task
          </FormLabel>
          <TextField
            name="task"
            type="text"
            placeholder="Enter your task here..."
            inputRef={register}
            className={classes.root}
          />
        </div>
        <div className="category">
          <FormLabel component="legend" className={classes.label}>
            Category
          </FormLabel>
          <Controller
            as={
              <Select className={classes.dropdown}>
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
        </div>
        <div>
          <FormLabel component="legend" className={classes.label}>
            Deadline
          </FormLabel>
          <TextField
            id="datetime-local"
            type="datetime-local"
            inputRef={register}
            name="deadline"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="radio-container">
          <Controller
            as={
              <RadioGroup name="priority" className={classes.radio}>
                <FormLabel component="legend" className={classes.label}>
                  Priority
                </FormLabel>
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
