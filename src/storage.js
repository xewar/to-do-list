import dom from './dom.js';
import project from './project.js';
import task from './task.js';

let storage = (() => {
  'use strict';
  const { populateTasks, allTasksList, addTaskToList } = task;
  const { renderTask, renderProject } = dom;
  const { projectList, updateProjectList } = project;

  //set storage
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
        [
          'Linting',
          'Coding',
          '2022-03-15',
          'high',
          'Set up a linter and prettier to make your code better.',
          false,
        ],
        [
          'Dynamic User Interfaces',
          'Coding',
          '2022-03-16',
          'high',
          'Practice everyday techniques used by JavaScript programmers',
          false,
        ],
        [
          'Go for a run',
          'Exercise',
          '2022-03-17',
          'medium',
          'Example notes',
          false,
        ],
        ['Stretch', 'Exercise', '2022-03-18', 'high', 'Example Notes', false],
      ];
      populateTasks(exampleTaskArray);
    }
    projectList.forEach(project => renderProject(project));
    allTasksList.forEach(task => renderTask(task));
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

  return { updateStorage, storageAvailable, getStorage };
})();

export default storage;
