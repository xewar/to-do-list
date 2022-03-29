import { allTasksList } from '../../to-do/src/task.js';
import task from './task.js';

let storage = (() => {
  const { createTask, addTaskToList, allTasksList } = task;

  // populate storage
  const updateStorage = () => {
    localStorage.setItem('allTasksList', JSON.stringify(allTasksList));
  };

  // retrieves projects from local storage
  const getStorage = () => {
    // checks to see if it's possible to use local storage
    if (!storageAvailable('localStorage')) {
      alert(
        "FYI, we aren't able to save your to-dos for future visits to the page. You can try with a different browser"
      );
    }
    if (localStorage.getItem('allTasksList')) {
      const storedTasks = JSON.parse(localStorage.getItem('allTasksList'));
      populateTasks(storedTasks);
    } else {
      // when loading tasks for the first time, populate page with some example tasks + projects
      const exampleTaskArray = [
        {
          taskName: 'Linting',
          projectName: 'Coding',
          dueDate: '2022-03-15',
          priority: 'high',
          notes: 'Set up a linter and prettier to make your code better.',
          isCompleted: false,
        },
        {
          taskName: 'Dynamic User Interfaces',
          projectName: 'Coding',
          dueDate: '2022-03-15',
          priority: 'high',
          notes: 'Practice everyday techniques used by JavaScript programmers',
          isCompleted: false,
        },
        {
          taskName: 'Go for a run',
          projectName: 'Exercise',
          dueDate: '2022-03-17',
          priority: 'medium',
          notes: 'Example notes',
          isCompleted: false,
        },
        {
          taskName: 'Stretch',
          projectName: 'Exercise',
          dueDate: '2022-03-18',
          priority: 'high',
          notes: 'Example Notes',
          isCompleted: false,
        },
      ];
      populateTasks(exampleTaskArray);
    }
  };

  // populate tasks from storage, and update DOM + projectsArray
  const populateTasks = tasksArray => {
    for (const taskItem of tasksArray) {
      const newTask = createTask(taskItem);
      addTaskToList(newTask); // add the task to the all Tasks List
      //   updateDOM(newTask);
    }
    for (let item of allTasksList) {
      console.log(item.getName());
    }
  };

  // Source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  // Checks to see if storage can be saved to local computer
  function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  return { updateStorage, storageAvailable, getStorage, populateTasks };
})();

export default storage;
