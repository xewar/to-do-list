import task from './task';
import elements from './domElements';
import project from './project';
import { addDays, format, parseISO } from 'date-fns';

let dom = (() => {
  const { allTasksList } = task;
  const { projectList, deleteProject } = project;
  const {
    formBackground,
    popupForm,
    saveChangesButton,
    deleteTaskButton,
    navProjects,
    cardsContainer,
    friendsContainer,
    titleText,
    taskViewContainer,
    taskName,
    taskInput,
    projectInput,
    dueDate,
    notesLabel,
    notesInput,
    priorityInput,
    priorityLabel,
    dueDateInput,
    navContainer,
  } = elements;

  let clearCompletedTasksBool = false;
  //modified from https://github.com/noLakes/cabbage/blob/master/src/dom.js
  let _divCreator = (
    type,
    className = undefined,
    appendTo = undefined,
    textContent = undefined
  ) => {
    const div = document.createElement(type);
    if (className) {
      className.split(' ').forEach(cName => div.classList.add(cName));
    }
    if (appendTo) {
      appendTo.append(div);
    }
    if (textContent) {
      div.textContent = textContent;
    }

    return div;
  };
  const renderProject = projectName => {
    _addProjectToNavMenu(projectName);
    _createProjectCard(projectName);
  };

  const renderTask = newTask => {
    //find the correct project card to update
    const titleDivs = document.querySelectorAll('.projectTitle');
    const taskContainer = Array.from(titleDivs).find(
      title => title.textContent === newTask.getProject()
    ).nextSibling;
    // create a new task + appends it to the project card
    const task = _divCreator('div', 'task');
    const checkbox = _createCheckbox();
    checkboxCorrection(newTask, checkbox);
    const p = _divCreator('p', 'taskText', undefined, newTask.getName());
    task.append(checkbox, p);
    taskContainer.append(task);
  };

  const _addProjectToNavMenu = projectName => {
    _divCreator('div', 'projects nav', navProjects, projectName);
  };

  const _createProjectCard = projectName => {
    const projectCard = _divCreator('div', 'projectCard', cardsContainer);
    _divCreator('div', 'projectTitle', projectCard, projectName);
    _divCreator('div', 'taskContainer', projectCard);
  };

  let _createCheckbox = () => {
    const label = _divCreator('label', 'checkmark');
    label.name = 'checkbox';
    const input = _divCreator('input', undefined, label);
    input.type = 'checkbox';
    const span = _divCreator('span', 'check', label);
    return label;
  };

  //regenerating kanban view
  const kanbanView = () => {
    friendsContainer.style.display = 'block';
    titleText.textContent = 'Your Projects';
    taskViewContainer.style.display = 'none';
    // clear what is in the cards container
    cardsContainer.style.display = 'grid';
    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }
    // regenerate contents of cards container
    for (let project of projectList) {
      _createProjectCard(project);
    }
    for (let task of allTasksList) {
      if (task.getCompletedStatus() === true && clearCompletedTasksBool) {
        continue; //hide completed tasks if clearCompletedTasksBool is true
      }
      renderTask(task);
    }
  };

  const _renderTasksListView = task => {
    const checkbox = _createCheckbox();
    checkboxCorrection(task, checkbox);
    taskViewContainer.append(checkbox);
    _divCreator('div', 'taskText', taskViewContainer, task.getName());
    _divCreator('div', 'dueDate', taskViewContainer, task.getDate());
    _divCreator('div', 'priority', taskViewContainer, task.getPriority());
    let notes = _divCreator('div', 'notes', undefined, task.getNotes());
    // notes.contentEditable = true; //can revisit to make notes editable with an input event listener
    taskViewContainer.append(notes);
    _divCreator('svg', 'editIcon', taskViewContainer);
  };
  const _renderHeadersListView = () => {
    _divCreator('div', 'taskTitle', taskViewContainer, 'Name');
    _divCreator('div', 'dueDateTitle', taskViewContainer, 'Due');
    _divCreator('div', 'priorityTitle', taskViewContainer, 'Priority');
    _divCreator('div', 'notesTitle', taskViewContainer, 'Notes');
  };
  function padToTwo(number) {
    return number > 9 ? number : `0${number}`;
  }
  const timeZoneOffset = date => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Date provides month index; not month number
    const day = date.getUTCDate();
    return `${year}-${padToTwo(month)}-${padToTwo(day)}`;
  };
  const logbookView = () => {
    titleText.textContent = 'Logbook';
    for (const task of allTasksList) {
      if (task.getCompletedStatus() === true) {
        _renderTasksListView(task);
      }
    }
  };
  const todayView = () => {
    let today = new Date();
    today = format(today, 'yyyy-MM-dd');
    for (const task of allTasksList) {
      if (task.getCompletedStatus() === true && clearCompletedTasksBool) {
        continue;
      }
      let taskDate = new Date(task.getDate());
      taskDate = timeZoneOffset(taskDate);
      if (taskDate === today) {
        _renderTasksListView(task);
      }
    }
  };
  const upcomingView = () => {
    let today = new Date();
    let upcoming = addDays(today, 7);
    upcoming = format(upcoming, 'yyyy-MM-dd');
    today = format(today, 'yyyy-MM-dd');
    for (const task of allTasksList) {
      if (task.getCompletedStatus() === true && clearCompletedTasksBool) {
        continue;
      }
      let taskDate = new Date(task.getDate());
      taskDate = timeZoneOffset(taskDate);
      if (taskDate < upcoming && taskDate > today) {
        // due in the next five days
        _renderTasksListView(task);
      }
    }
  };
  const anytimeView = () => {
    for (const task of allTasksList) {
      if (task.getCompletedStatus() === true && clearCompletedTasksBool) {
        continue;
      }
      if (task.getDate() === '') {
        _renderTasksListView(task);
      }
    }
  };
  const allView = () => {
    for (const task of allTasksList) {
      if (task.getCompletedStatus() === true && clearCompletedTasksBool) {
        continue;
      }
      _renderTasksListView(task);
    }
  };
  const overdueView = () => {
    let today = new Date();
    today = format(today, 'yyyy-MM-dd');
    for (const task of allTasksList) {
      if (task.getCompletedStatus() === true && clearCompletedTasksBool) {
        continue;
      }
      let taskDate = new Date(task.getDate());
      taskDate = timeZoneOffset(taskDate);
      if (taskDate < today) {
        _renderTasksListView(task);
      }
    }
  };
  // click on the projects to dynamically generate and view the tasks for each project
  const projectView = currentProjectName => {
    titleText.textContent = currentProjectName;
    for (const task of allTasksList) {
      // regenerating tasks
      if (task.getCompletedStatus() === true && clearCompletedTasksBool) {
        continue;
      }
      if (task.getProject() === currentProjectName) {
        _renderTasksListView(task);
      }
    }
  };

  // all the views except the Kanban view
  const listView = currentProjectName => {
    titleText.textContent = currentProjectName;
    cardsContainer.style.display = 'none'; // clearing the kanban cards
    friendsContainer.style.display = 'none';
    taskViewContainer.style.display = 'grid';
    // clearing any existing tasks
    while (taskViewContainer.firstChild) {
      taskViewContainer.removeChild(taskViewContainer.firstChild);
    }
    _renderHeadersListView(); // regenerating headers
  };

  // Adding a class to format tasks differently when they're checked
  let toggleChecked = label => {
    if (label.classList.contains('checked')) {
      label.classList.remove('checked');
    } else label.classList.add('checked');
  };

  const displayPopup = () => {
    formBackground.style.display = 'block';
    popupForm.style.display = 'grid';
    saveChangesButton.style.display = 'none';
    deleteTaskButton.style.display = 'none';
  };

  const closePopup = () => {
    formBackground.style.display = 'none';
    popupForm.style.display = 'none';
    popupForm.reset();
    clearEmptyProjects();
  };
  const hiddenElements = [
    taskName,
    taskInput,
    dueDate,
    notesLabel,
    notesInput,
    priorityInput,
    priorityLabel,
    dueDateInput,
  ];
  const displayTaskOptions = () => {
    for (const element of hiddenElements) {
      element.style.display = 'block';
      newTaskButton.style.backgroundColor = '#fedce6';
      newProjectButton.style.backgroundColor = 'rgb(239, 241, 250)';
    }
  };
  const displayProjectOptions = () => {
    for (const element of hiddenElements) {
      element.style.display = 'none';
      newProjectButton.style.backgroundColor = '#fedce6';
      newTaskButton.style.backgroundColor = 'rgb(239, 241, 250)';
    }
  };

  let checkboxCorrection = (task, checkbox) => {
    if (task.getCompletedStatus() === true) {
      checkbox.click();
      checkbox.classList.add('checked');
      for (const storedTask of allTasksList) {
        if (task.getName() === storedTask.getName()) {
          storedTask.setCompletedStatus(true);
        }
      }
    }
    if (task.getCompletedStatus() === false) {
      checkbox.classList.remove('checked');
    }
  };
  const toggleCompleted = () => {
    clearCompletedTasksBool === false
      ? (clearCompletedTasksBool = true)
      : (clearCompletedTasksBool = false);
    reloadPage();
  };
  const reloadPage = () => {
    let pageName = document.querySelector('.titleText').textContent;
    if (pageName === 'Your Projects') {
      pageName = 'Kanban';
    }
    const navPages = document.querySelectorAll('.nav');
    navPages.forEach(page => {
      if (page.textContent === pageName) {
        page.click();
      }
    });
  };

  let modifyTasks = taskName => {
    displayPopup();
    // show the save and delete buttons but hide the new task/new project buttons
    saveChangesButton.style.display = 'block';
    deleteTaskButton.style.display = 'block';
    createButton.style.display = 'none';
    newTaskButton.style.display = 'none';
    newProjectButton.style.display = 'none';
    // let taskName = taskName
    // populate the form with the task info so that it can be saved or deleted
    taskInput.value = taskName;
    let currentTask = '';
    for (const task of allTasksList) {
      // find the other information about the task
      if (taskName === task.getName()) {
        currentTask = task;
      }
    }
    projectInput.value = currentTask.getProject();
    const dueDate = parseISO(currentTask.getDate());
    const formattedDate = format(dueDate, 'yyyy-MM-dd');
    dueDateInput.value = formattedDate;
    priorityInput.value = currentTask.getPriority();
    notesInput.value = currentTask.getNotes();
    return modifiedTaskName;
  };

  const toggleMenuDisplay = () => {
    if (navContainer.classList.contains('displayContainer')) {
      navContainer.classList.remove('displayContainer');
    } else {
      navContainer.classList.add('displayContainer');
    }
  };
  const clearEmptyProjects = () => {
    for (const project of navProjects.children) {
      let numberOfTasks = 0;
      const projectName = project.textContent;
      for (const task of allTasksList) {
        if (task.getProject() === projectName) {
          numberOfTasks++;
        }
      }
      if (numberOfTasks === 0) {
        project.remove();
        deleteProject(project);
      }
    }
  };

  return {
    displayPopup,
    closePopup,
    renderTask,
    renderProject,
    toggleChecked,
    displayProjectOptions,
    displayTaskOptions,
    kanbanView,
    listView,
    projectView,
    logbookView,
    todayView,
    upcomingView,
    anytimeView,
    allView,
    overdueView,
    toggleCompleted,
    modifyTasks,
    reloadPage,
    toggleMenuDisplay,
  };
})();

export default dom;
