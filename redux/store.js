import {createStore} from 'redux';
import characterItemReducer from './item';

const store = createStore(characterItemReducer);

export default store;
