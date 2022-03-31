let elements = (() => {
  return {
    formBackground: document.querySelector('.formBackground'),
    popupForm: document.querySelector('.newProjectForm'),
    saveChangesButton: document.querySelector('#saveChangesButton'),
    deleteTaskButton: document.querySelector('#deleteTaskButton'),
    navProjects: document.querySelector('.navProjects'),
    newTaskButton: document.querySelector('#newTaskButton'),
    newProjectButton: document.querySelector('#newProjectButton'),
    cardsContainer: document.querySelector('.cardsContainer'),
    friendsContainer: document.querySelector('.friendsContainer'),
    titleText: document.querySelector('.titleText'),
    taskViewContainer: document.querySelector('.taskViewContainer'),
    createButton: document.querySelector('#createButton'),
    dateViews: document.querySelectorAll('.dateView'),
    logbook: document.querySelector('.logbook'),
    today: document.querySelector('.today'),
    upcoming: document.querySelector('.upcoming'),
    anytime: document.querySelector('.anytime'),
    all: document.querySelector('.all'),
    overdue: document.querySelector('.overdue'),
  };
})();

export default elements;
