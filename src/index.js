import './style.css';
import storage from './storage';
import eventHandlers from './eventHandlers';

eventHandlers.clickHandler();
eventHandlers.changeHandler();

storage.getStorage();
