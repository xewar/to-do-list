import task from './task';
import storage from './storage';

let dom = (() => {
  const { createTask } = task;
  const formBackground = document.querySelector('.formBackground');
  const popupForm = document.querySelector('.newProjectForm');
  const saveChangesButton = document.querySelector('#saveChangesButton');
  const deleteTaskButton = document.querySelector('#deleteTaskButton');
  const navProjects = document.querySelector('.navProjects');
  const newTaskButton = document.querySelector('#newTaskButton');
  const newProjectButton = document.querySelector('#newProjectButton');
  const cardsContainer = document.querySelector('.cardsContainer');
  const friendsContainer = document.querySelector('.friendsContainer');
  const titleText = document.querySelector('.titleText');
  const taskViewContainer = document.querySelector('.taskViewContainer');
  const createButton = document.querySelector('#createButton');
  const dateViews = document.querySelectorAll('.dateView');
  const logbook = document.querySelector('.logbook');
  const today = document.querySelector('.today');
  const upcoming = document.querySelector('.upcoming');
  const anytime = document.querySelector('.anytime');
  const all = document.querySelector('.all');
  const overdue = document.querySelector('.overdue');
  let clearCompletedTasksBool = false;

  const renderProject = projectName => {
    _addProjectToNavMenu(projectName);
    _createProjectCard(projectName);
  };

  const renderTask = newTask => {
    console.log('task rendered here');
    _renderKanban(newTask);
    // add it to list view
  };

  const _addProjectToNavMenu = projectName => {
    const projectNav = document.createElement('div');
    projectNav.classList.add('projects', 'nav');
    projectNav.textContent = projectName;
    navProjects.append(projectNav);
  };

  const _createProjectCard = projectName => {
    const projectCard = document.createElement('div');
    projectCard.className = 'projectCard';
    const projectTitle = document.createElement('div');
    projectTitle.className = 'projectTitle';
    projectTitle.textContent = projectName;
    const taskContainer = document.createElement('div');
    taskContainer.className = 'taskContainer';
    projectCard.append(projectTitle);
    projectCard.append(taskContainer);
    cardsContainer.append(projectCard);
  };

  let _createCheckbox = () => {
    const label = document.createElement('label');
    label.name = 'checkbox';
    label.className = 'checkmark';
    const input = document.createElement('input');
    input.type = 'checkbox';
    const span = document.createElement('span');
    span.className = 'check';
    label.append(input, span);
    return label;
  };

  const _renderKanban = newTask => {
    //find the correct project card to update
    const titleDivs = document.querySelectorAll('.projectTitle');
    const taskContainer = Array.from(titleDivs).find(
      title => title.textContent === newTask.getProject()
    ).nextSibling;
    // create a new task + append it to project card
    const task = document.createElement('div');
    task.className = 'task';
    const checkbox = _createCheckbox();
    checkboxCorrection(newTask, checkbox);
    const p = document.createElement('p');
    p.className = 'taskText';
    const taskName = newTask.getName();
    p.textContent = taskName;
    task.append(checkbox, p);
    taskContainer.append(task);
  };

  let checkboxCorrection = (task, checkbox) => {
    // if (task.getCompletedStatus() === true) {
    //   checkbox.click();
    //   checkbox.classList.add('checked');
    //   for (const storedTask of allTasksList) {
    //     if (task.getName() === storedTask.getName()) {
    //       storedTask.setCompletedStatus(true);
    //     }
    //   }
    // }
    // if (task.getCompletedStatus() === false) {
    //   checkbox.classList.remove('checked');
    // }
  };

  // Checking a task
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

  const createNew = () => {
    let data = {};
    //need to take form data and create a new task, in tasks not the DOM
    // const dataList = [
    //   'taskName',
    //   'projectName',
    //   'dueDate',
    //   'priority',
    //   'notes',
    // ];
    // for (const item of dataList) {
    //   data[item] = document.getElementById(`${item}`).value;
    // }
    // console.log(data);
    // const newTask = createTask(data); // creates a new task
    // console.log(newTask.getName());
    // addTaskToList(newTask); // adds it to allTasksList, the main place projects are stored
    // dom.updateDOM(newTask);
    // updateStorage();
    // popupForm.reset(); // clears form
    // closePopup();
  };

  return {
    createNew,
    displayPopup,
    renderTask,
    renderProject,
    toggleChecked,
  };
})();

export default dom;
