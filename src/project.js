import task from './task';
let project = (() => {
  let projectList = [];
  const updateProjectList = newTask => {
    if (!projectExists(newTask)) {
      projectList.push(newTask.getProject());
    }
  };
  const projectExists = newTask => {
    //returns true if project exists
    return projectList.indexOf(newTask.getProject()) !== -1;
  };
  return {
    projectExists,
    projectList,
    updateProjectList,
  };
})();

export default project;
