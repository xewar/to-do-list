import task from './task';
import storage from './storage';
import elements from './domElements';

let dom = (() => {
  const { createTask } = task;
  const {
    formBackground,
    popupForm,
    saveChangesButton,
    deleteTaskButton,
    navProjects,
    newTaskButton,
    newProjectButton,
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
    const projectNav = divCreator(
      'div',
      'projects nav',
      navProjects,
      projectName
    );
  };

  const _createProjectCard = projectName => {
    const projectCard = divCreator('div', 'projectCard', cardsContainer);
    const projectTitle = divCreator(
      'div',
      'projectTitle',
      projectCard,
      projectName
    );
    const taskContainer = divCreator('div', 'taskContainer', projectCard);
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
    // create a new task + append it to project card
    const task = divCreator('div', 'task', taskContainer);
    const checkbox = _createCheckbox();
    checkboxCorrection(newTask, checkbox);
    task.append(checkbox);
    const p = divCreator('p', 'taskText', task, newTask.getName());
    taskContainer.append(task);
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
  return {
    createNew,
    displayPopup,
    renderTask,
    renderProject,
    toggleChecked,
  };
})();

export default dom;
