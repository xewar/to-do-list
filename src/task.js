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
    isCompleted
  ) => {
    const getName = () => taskName;
    const getDate = () => dueDate;
    const getProject = () => project;
    const getNotes = () => notes;
    const getCompletedStatus = () => isCompleted;
    const toggleCompletedStatus = () => {
      if (isCompleted === true) {
        isCompleted = false;
      } else isCompleted = true;
    };
    const getPriority = () => priority;

    return {
      getName,
      getDate,
      getProject,
      getNotes,
      getCompletedStatus,
      toggleCompletedStatus,
      getPriority,
    };
  };

  const allTasksList = [];
  const addTaskToList = task => {
    allTasksList.push(task);
    updateProjectList(task);
  };

  const updateTaskStatus = taskName => {
    allTasksList.forEach(task => {
      if (task.getName() === taskName) {
        task.toggleCompletedStatus();
      }
    });
  };

  // populate taskList from storage
  const populateTasks = tasksArray => {
    for (const taskItem of tasksArray) {
      const newTask = taskFactory(...taskItem);
      addTaskToList(newTask); // add the task to the all Tasks List
    }
  };

  return {
    taskFactory,
    allTasksList,
    addTaskToList,
    populateTasks,
    updateTaskStatus,
  };
})();

export default task;
