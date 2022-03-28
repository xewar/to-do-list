let eventHandlers = (() => {
  let clickHandler = () => {
    document.addEventListener('click', e => {
      if (e.target.classList.contains('editIcon')) {
        // call function here
      }
    });
  };
  let changeHandler = () => {
    document.addEventListener('change', e => {
      //conditionals and functions here
    });
  };
})();

export default eventHandlers;
