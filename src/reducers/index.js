import {combineReducers} from 'redux';
import blogs from './blogsReducer';
import user from './loginReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  blogs,
  user
});

export default rootReducer;
