import './style.css';
import storage from './storage';
import eventHandlers from './eventHandlers';
import task from './task.js';

eventHandlers.clickHandler();
eventHandlers.changeHandler();

localStorage.clear();
storage.getStorage();
