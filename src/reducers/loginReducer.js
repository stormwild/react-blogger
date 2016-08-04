import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function blogReducer(state = initialState.user, action) {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      return action.user;
    default:
      return state;
  }
}
