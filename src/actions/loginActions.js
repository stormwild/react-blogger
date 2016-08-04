import * as types from './actionTypes';
import fetchApi from '../api/fetchApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, user };
}

export function login(user) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return fetchApi.get('/users/' + user.username).then(matchedUser => {
      dispatch(loginSuccess(matchedUser));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
