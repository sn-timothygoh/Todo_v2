// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
import authReducer from './authReducer';
import taskReducer from './taskReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  taskReducer: taskReducer,
});
// Exports
export default rootReducer;
