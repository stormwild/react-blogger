import React from  'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import LoginPage from './components/login/LoginPage';
import BlogsPage from './components/blog/BlogsPage';
import BlogPage from './components/blog/BlogPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="blogs" component={BlogsPage} />
    <Route path="blogs/:blogId" component={BlogPage} />
  </Route>
);
