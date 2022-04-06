import project from './project';
import elements from './domElements';

let task = (() => {
  const { updateProjectList, projectExists } = project;
  const { taskInput, projectInput, notesInput, priorityInput, dueDateInput } =
    elements;
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
      }
    });
  };
  const saveChanges = () => {
    for (const task of allTasksList) {
      // update the information in the allTasksList
      if (task.getName() === getCurrentTask()) {
        task.setName(taskInput.value);
        task.setProject(projectInput.value);
        task.setDate(dueDateInput.value);
        task.setPriority(priorityInput.value);
        task.setNotes(notesInput.value);
      }
    }
  };
  let currentTask = '';
  const setCurrentTask = taskName => {
    currentTask = taskName;
  };
  const getCurrentTask = () => currentTask;
  const createTask = newTaskArray => {
    return taskFactory(...newTaskArray);
  };

  const deleteTasks = () => {
    const taskName = taskInput.value;
    // look for the task and delete it
    for (const index in allTasksList) {
      if (allTasksList[index].getName() === taskName) {
        allTasksList.splice(index, 1);
      }
    }
  };

  // populate taskList from storage
  const populateTasks = tasksArray => {
    for (let taskItem of tasksArray) {
      let newTask = createTask(taskItem);
      addTaskToList(newTask);
      updateProjectList(newTask.getProject());
    }
  };

  return {
    taskFactory,
    allTasksList,
    addTaskToList,
    createTask,
    populateTasks,
    updateTaskStatus,
    saveChanges,
    setCurrentTask,
    getCurrentTask,
    deleteTasks,
  };
})();

export default task;
