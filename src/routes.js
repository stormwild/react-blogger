import React from  'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import LoginPage from './components/login/LoginPage';
import BlogPage from './components/blog/BlogPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="blog/:id" component={BlogPage} />
  </Route>
);
