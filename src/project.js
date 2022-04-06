import task from './task';
let project = (() => {
  let projectList = [];
  const updateProjectList = projectName => {
    if (!projectExists(projectName)) {
      projectList.push(projectName);
    }
  };
  const deleteProject = projectName => {
    projectList = projectList.filter(value => value != projectName);
  };
  const projectExists = projectName => {
    //returns true if project exists
    return projectList.indexOf(projectName) !== -1;
  };
  return {
    projectExists,
    projectList,
    updateProjectList,
  };
})();

export default project;
