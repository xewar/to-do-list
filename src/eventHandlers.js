import task from './task';
import storage from './storage';
import dom from './dom';
import project from './project';

let eventHandlers = (() => {
  let clickHandler = () => {
    const {
      renderTask,
      renderProject,
      displayPopup,
      closePopup,
      displayTaskOptions,
      displayProjectOptions,
      kanbanView,
      listView,
      logbookView,
      projectView,
      todayView,
      upcomingView,
      anytimeView,
      allView,
      overdueView,
    } = dom;
    const { createTask, addTaskToList } = task;
    const { updateStorage, getStorage } = storage;
    const { projectExists, updateProjectList } = project;
    document.addEventListener('click', e => {
      if (e.target.classList.contains('addNewButton')) {
        displayPopup(); //displays pop-up to add new tasks
      }
      if (e.target.id === 'createButton') {
        //creating a new task with the pop-up form
        e.preventDefault();
        let newTaskArray = [];
        let formInputs = document.querySelectorAll('.input');
        formInputs.forEach(input => newTaskArray.push(input.value));
        let newTask = createTask(newTaskArray);
        addTaskToList(newTask);
        if (!projectExists(newTask)) {
          renderProject(newTask.getProject());
        }
        updateProjectList(newTask);
        renderTask(newTask);
        closePopup();
        updateStorage();
      }
      if (e.target.id === 'newTaskButton') {
        e.preventDefault();
        displayTaskOptions();
      }
      if (e.target.id === 'newProjectButton') {
        e.preventDefault();
        displayProjectOptions();
      }
      if (e.target.classList.contains('kanban')) {
        kanbanView();
      }
      if (e.target.classList.contains('editIcon')) {
        // modifyTasks(taskName);
      }
      if (e.target.classList.contains('nav')) {
        if (!e.target.classList.contains('kanban')) {
          listView(projectName);
        }
      }
      if (e.target.classList.contains('projects')) {
        let projectName = e.target.textContent;
        projectView(projectName);
      }

      if (e.target.classList.contains('logbook')) {
        logbookView();
      }
      if (e.target.classList.contains('all')) {
        allView();
      }
      if (e.target.classList.contains('today')) {
        todayView();
      }
      if (e.target.classList.contains('overdue')) {
        overdueView();
      }
      if (e.target.classList.contains('anytime')) {
        anytimeView();
      }
      if (e.target.classList.contains('upcoming')) {
        upcomingView();
      }
    });

    document.addEventListener('dblclick', e => {
      console.log(e.target.tagName === 'P');
      //   modifyTasks(taskName);
    });
  };
  let changeHandler = () => {
    //marking tasks complete / incomplete
    const { updateTaskStatus } = task;
    const { toggleChecked } = dom;
    const { updateStorage } = storage;
    document.addEventListener('change', e => {
      if (e.target.type === 'checkbox') {
        let label = e.target.parentElement;
        let taskName = e.target.parentElement.parentElement.textContent;
        toggleChecked(label);
        updateTaskStatus(taskName);
        updateStorage();
      }
    });
  };
  return { clickHandler, changeHandler };
})();

export default eventHandlers;
