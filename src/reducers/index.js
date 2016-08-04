import {combineReducers} from 'redux';
import blog from './blogReducer';
import login from './loginReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  blog,
  login
});

export default rootReducer;
