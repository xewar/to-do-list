import './style.css';
import storage from './storage';
import eventHandlers from './eventHandlers';
import task from './task';

eventHandlers.clickHandler();
eventHandlers.changeHandler();

storage.getStorage();
