import React from  'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import BlogsPage from './components/blogs/BlogsPage';
import BlogPage from './components/blogs/BlogPage';
import PostPage from './components/posts/PostPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="blogs" component={BlogsPage} />
    <Route path="blogs/:blogId" component={BlogPage} />
    <Route path="blogs/:blogId/posts/:postId" component={PostPage} />
  </Route>
);
