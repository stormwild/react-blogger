import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function blogsReducer(state = initialState.blogs, action) {
  switch(action.type) {
    case types.LOAD_BLOGS_SUCCESS:
      return action.blogs;
    default:
      return state;
  }
}
