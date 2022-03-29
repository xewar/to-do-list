import { Task } from '../../to-do/src/task';

const task = ((
  name,
  project,
  dueDate,
  priority,
  notes,
  isCompleted,
  repeatFrequency
) => {
  const getName = () => name;
  const setName = newName => (name = newName);
  const getDate = () => dueDate;
  const setDate = newDate => (dueDate = newDate);
  const getProject = () => project;
  const setProject = newProjectName => {
    newProjectName === ''
      ? (project = 'No Project')
      : (project = newProjectName);
  };
  const getNotes = () => notes;
  const setNotes = newNotes => (notes = newNotes);
  const getCompletedStatus = () => isCompleted;
  const setCompletedStatus = bool => (isCompleted = bool);
  const getAllTasks = () =>
    Object.freeze([
      name,
      project,
      dueDate,
      priority,
      notes,
      isCompleted,
      repeatFrequency,
    ]);
  const getPriority = () => priority;
  const setPriority = newPriorityStatus => (priority = newPriorityStatus);
  const toJSON = () => getAllTasks();
  const allTasksList = [];
  const addTaskToList = task => {
    allTasksList.push(task);
  };
  const createTask = taskObj => {
    let newTask = Task(
      taskObj.taskName,
      taskObj.projectName,
      taskObj.dueDate,
      taskObj.priority,
      taskObj.notes,
      false
    );
    //could also update taskList and updateStorage here
    return newTask;
  };
  return {
    toJSON,
    getAllTasks,
    getName,
    setName,
    getDate,
    setDate,
    getProject,
    setProject,
    getNotes,
    setNotes,
    getCompletedStatus,
    setCompletedStatus,
    getPriority,
    setPriority,
    allTasksList,
    addTaskToList,
    createTask,
  };
})();

export default task;
