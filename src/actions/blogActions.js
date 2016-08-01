import * as types from './actionTypes';
import fetchApi from '../api/fetchApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadBlogPostSuccess(blogPost) {
  return { type: types.LOAD_BLOG_POST_SUCCESS, blogPost };
}

export function createBlogPostSuccess(blogPost) {
  return { type: types.CREATE_BLOG_POST_SUCCESS, blogPost };
}

export function loadBlogPost(blogId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return fetchApi.get('/blog/' + blogId).then(savedBlog => {
      dispatch(loadBlogPostSuccess(savedBlog));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function saveBlogPost(blogPost) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return fetchApi.post('/blog/' + blogPost.id).then(savedBlog => {
      console.log(savedBlog);
      dispatch(createBlogPostSuccess(savedBlog));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
