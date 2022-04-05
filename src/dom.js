import task from './task';
import elements from './domElements';
import project from './project';

let dom = (() => {
  const { allTasksList, createTask, populateTasks, taskFactory } = task;
  const { projectList } = project;
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
    createBB,
    dateViews,
    logbook,
    today,
    upcoming,
    anytime,
    all,
    overdue,
    taskName,
    taskInput,
    dueDate,
    notesLabel,
    notesInput,
    priorityInput,
    priorityLabel,
    dueDateInput,
  } = elements;

  let clearCompletedTasksBool = false;
  //modified from https://github.com/noLakes/cabbage/blob/master/src/dom.js
  let divCreator = (
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
    _renderKanban(newTask);
    // add it to list view
  };

  const _addProjectToNavMenu = projectName => {
    divCreator('div', 'projects nav', navProjects, projectName);
  };

  const _createProjectCard = projectName => {
    const projectCard = divCreator('div', 'projectCard', cardsContainer);
    divCreator('div', 'projectTitle', projectCard, projectName);
    divCreator('div', 'taskContainer', projectCard);
  };

  let _createCheckbox = () => {
    const label = divCreator('label', 'checkmark');
    label.name = 'checkbox';
    const input = divCreator('input', undefined, label);
    input.type = 'checkbox';
    const span = divCreator('span', 'check', label);
    return label;
  };

  const _renderKanban = newTask => {
    //find the correct project card to update
    const titleDivs = document.querySelectorAll('.projectTitle');
    const taskContainer = Array.from(titleDivs).find(
      title => title.textContent === newTask.getProject()
    ).nextSibling;
    // create a new task + appends it to the project card
    const task = divCreator('div', 'task');
    const checkbox = _createCheckbox();
    checkboxCorrection(newTask, checkbox);
    const p = divCreator('p', 'taskText', undefined, newTask.getName());
    task.append(checkbox, p);
    taskContainer.append(task);
  };

  const _renderListView = task => {
    const checkbox = createCheckbox();
    taskViewContainer.append(checkbox);
    divCreator('div', 'taskText', taskViewContainer, task.getName());
    divCreator('div', 'dueDate', taskViewContainer, task.getDate());
    divCreator('div', 'priority', taskViewContainer, task.getPriority());
    divCreator('div', 'notes', taskViewContainer, task.getNotes());
    divCreator('svg', 'editIcon', taskViewContainer);
    checkboxCorrection(task, checkbox);
  };
  const renderHeadersListView = () => {
    divCreator('div', 'taskTitle', taskViewContainer, 'Name');
    divCreator('div', 'dueDateTitle', taskViewContainer, 'Due');
    divCreator('div', 'priorityTitle', taskViewContainer, 'Priority');
    divCreator('div', 'notesTitle', taskViewContainer, 'Notes');
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

  // all the views except the Kanban view
  const listView = currentProjectName => {
    cardsContainer.style.display = 'none'; // clearing the kanban cards
    friendsContainer.style.display = 'none';
    titleText.textContent = currentProjectName;
    taskViewContainer.style.display = 'grid';
    // clearing any existing tasks
    while (taskViewContainer.firstChild) {
      taskViewContainer.removeChild(taskViewContainer.firstChild);
    } // regenerating headers
    renderHeadersListView();
    // if (e.target.classList.contains("projects")) {
    //   projectView(currentProjectName);
    // }
    // if (e.target.classList.contains("logbook")) {
    //   logbookView();
    // }
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
  const displayTaskOptions = ev => {
    for (const element of hiddenElements) {
      element.style.display = 'block';
      newTaskButton.style.backgroundColor = '#fedce6';
      newProjectButton.style.backgroundColor = 'rgb(239, 241, 250)';
    }
  };
  const displayProjectOptions = ev => {
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
  return {
    displayPopup,
    closePopup,
    renderTask,
    renderProject,
    toggleChecked,
    displayProjectOptions,
    displayTaskOptions,
    kanbanView,
  };
})();

export default dom;
