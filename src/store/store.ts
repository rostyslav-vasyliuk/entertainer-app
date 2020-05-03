import { createStore } from 'redux'
import reducer from './main-reducer';

const store = createStore(reducer);

export default store;
