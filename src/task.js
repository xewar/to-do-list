import project from './project';
// import storage from './storage.js';
// const { updateStorage } = storage;
let task = (() => {
  const { updateProjectList } = project;
  const taskFactory = (
    taskName,
    project,
    dueDate,
    priority,
    notes,
    isCompleted = false
  ) => {
    const getName = () => taskName;
    const getDate = () => dueDate;
    const getProject = () => project;
    const getNotes = () => notes;
    const getCompletedStatus = () => isCompleted;
    const setCompletedStatus = bool => (isCompleted = bool);
    const toggleCompletedStatus = () => {
      if (isCompleted === true) {
        isCompleted = false;
      } else isCompleted = true;
    };
    const getPriority = () => priority;
    const getAllTasks = () =>
      Object.freeze([taskName, project, dueDate, priority, notes, isCompleted]);
    const toJSON = () => getAllTasks();

    return {
      getName,
      getDate,
      getProject,
      getNotes,
      getCompletedStatus,
      setCompletedStatus,
      toggleCompletedStatus,
      getPriority,
      toJSON,
    };
  };

  let allTasksList = [];
  const addTaskToList = task => {
    allTasksList.push(task);
  };

  const updateTaskStatus = taskName => {
    allTasksList.forEach(task => {
      if (task.getName() === taskName) {
        task.toggleCompletedStatus();
      }
    });
  };
  const createTask = newTaskArray => {
    return taskFactory(...newTaskArray);
  };

  // populate taskList from storage
  const populateTasks = tasksArray => {
    for (let taskItem of tasksArray) {
      let newTask = createTask(taskItem);
      addTaskToList(newTask);
      updateProjectList(newTask);
    }
  };

  return {
    taskFactory,
    allTasksList,
    addTaskToList,
    createTask,
    populateTasks,
    updateTaskStatus,
  };
})();

export default task;
