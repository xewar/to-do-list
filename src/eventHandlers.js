import task from './task';
import storage from './storage';
import dom from './dom';
import { displayPopup } from '../../to-do/src/render';

let eventHandlers = (() => {
  let clickHandler = () => {
    const { createNew, displayPopup } = dom;
    document.addEventListener('click', e => {
      //   console.log(e.target);
      if (e.target.classList.contains('addNewButton')) {
        displayPopup();
      }
      if (e.target.id === 'createButton') {
        e.preventDefault();
        createNew();
      }
    });
    document.addEventListener('dblclick', e => {
      console.log(e.target.tagName === 'P');
      //   modifyTasks(taskName);
    });
  };
  let changeHandler = () => {
    const { updateTaskStatus } = task;
    const { toggleChecked } = dom;
    const { updateStorage } = storage;
    document.addEventListener('change', e => {
      if (e.target.type === 'checkbox') {
        let label = e.target.parentElement;
        let taskName = e.target.parentElement.parentElement.textContent;
        toggleChecked(label);
        updateTaskStatus(taskName);
        updateStorage();
      }
    });
  };
  return { clickHandler, changeHandler };
})();

export default eventHandlers;
