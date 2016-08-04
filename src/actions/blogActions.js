import * as types from './actionTypes';
import fetchApi from '../api/fetchApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadBlogPostSuccess(blogPost) {
  return { type: types.LOAD_BLOG_POST_SUCCESS, blogPost };
}

export function createBlogPostSuccess(blogPost) {
  return { type: types.CREATE_BLOG_POST_SUCCESS, blogPost };
}

export function loadBlogsSuccess(blogs) {
  return { type: types.LOAD_BLOGS_SUCCESS, blogs };
}

export function loadBlogs(userId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return fetchApi.get('/users/' + userId + '/blogs').then(savedBlogs => {
      dispatch(loadBlogsSuccess(savedBlogs));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function loadBlogPost(blogId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return fetchApi.get('/blogs/' + blogId).then(savedBlog => {
      dispatch(loadBlogPostSuccess(savedBlog));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function saveBlogPost(blog) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return fetchApi.put('/blog/' + blog.id, blog).then(savedBlog => {
      dispatch(createBlogPostSuccess(savedBlog));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
