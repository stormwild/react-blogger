import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {fetchApi} from '../api/fetchApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return fetchApi('/courses', 'get').then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return fetchApi('/courses', 'post', course).then(savedCourse => {
      dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function editCourse(course, courseId) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return fetchApi('/courses' + courseId, 'put', course).then(savedCourse => {
      dispatch(updateCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
