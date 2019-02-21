import {combineReducers, createStore} from 'redux';
import objectiveReducer from "./ObjectivesReducer";


export default createStore(combineReducers({
    objectiveReducer
}));
