import React, {PropTypes} from 'react';
import BlogListItem from './BlogListItem';

const BlogList = ({blogs, params, handleNewBlog, handleDeleteBlog}) => {
  return (
    <div className="BlogList">
      {blogs.map((blog, index) => {
        return (
          <BlogListItem
            key={blog._id}
            blog={blog}
            params={params}
            deleteBlog={handleDeleteBlog.bind(this, index)}
          />
        );
      })}
    </div>
  );
};

BlogList.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default BlogList;
