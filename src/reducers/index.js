import {combineReducers} from 'redux';
import blog from './blogReducer';
import user from './loginReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  blog,
  user
});

export default rootReducer;
