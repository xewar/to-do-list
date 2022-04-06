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
    const setName = newName => (taskName = newName);
    const getDate = () => dueDate;
    const setDate = newDate => (dueDate = newDate);
    const getProject = () => project;
    const setProject = newProject => (project = newProject);
    const getNotes = () => notes;
    const setNotes = newNotes => (notes = newNotes);
    const getCompletedStatus = () => isCompleted;
    const setCompletedStatus = bool => (isCompleted = bool);
    const toggleCompletedStatus = () => {
      if (isCompleted === true) {
        isCompleted = false;
      } else isCompleted = true;
    };
    const getPriority = () => priority;
    const setPriority = newPriority => (priority = newPriority);
    const getAllTasks = () =>
      Object.freeze([taskName, project, dueDate, priority, notes, isCompleted]);
    const toJSON = () => getAllTasks();

    return {
      getName,
      getDate,
      getProject,
      getNotes,
      setName,
      setProject,
      setNotes,
      setDate,
      setPriority,
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
        console.log(
          task.getName(),
          'new status is:',
          task.getCompletedStatus()
        );
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
