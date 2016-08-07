import React from  'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import BlogPage from './components/blogs/BlogPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="blogs/:blogId" component={BlogPage} />
  </Route>
);
