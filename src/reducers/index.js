import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import blog from './blogReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress,
  blog
});

export default rootReducer;
