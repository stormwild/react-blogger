import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';

const PostExcerpt = ({post, params, editPostTitle, deletePost}) => {
  return (
    <div>
      <h1>
        <Link to={"/blogs/" + params.blogId + "/posts/" + post.postId}>{post.title}</Link>
        <Button onClick={editPostTitle}>Edit</Button>
        <Button onClick={deletePost}>Delete</Button>
      </h1>
      <p>{post.content}</p>
    </div>
  );
};

PostExcerpt.propTypes = {
  post: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

export default PostExcerpt;
