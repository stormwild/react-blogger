import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function blogReducer(state = initialState.blog, action) {
  switch(action.type) {
    case types.LOAD_BLOG_POST_SUCCESS:
      return action.blogPost;
    default:
      return state;
  }
}
