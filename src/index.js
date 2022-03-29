import './style.css';
import storage from './storage';
import task from './task.js';
import eventHandlers from './eventHandlers';

// const { clickHandler, changeHandler } = eventHandlers;

// eventHandlers.clickHandler();
// eventHandlers.changeHandler();
const { getStorage, populateTasks } = storage;

const { createTask, addTaskToList, allTasksList, getName } = task;
// localStorage.clear();
storage.getStorage();

// let newOne = createTask({
//   taskName: 'Linting',
//   projectName: 'Coding',
//   dueDate: '2022-03-15',
//   priority: 'high',
//   notes: 'Set up a linter and prettier to make your code better.',
//   isCompleted: false,
// });
// console.log(newOne.getPriority());
// console.log('here');
// addTaskToList(newOne);
// console.log(allTasksList[0].getName());
