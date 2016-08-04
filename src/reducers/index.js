import {combineReducers} from 'redux';
import blog from './blogReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  blog
});

export default rootReducer;
