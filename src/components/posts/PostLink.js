import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';

const PostLink = ({url, title, isEditing, toggleEditing, deletePost}) => {
  return (
    <div>
      <Link to={url}>{title}</Link>
      {!isEditing && <Button onClick={toggleEditing}>Edit</Button>}
      <Button onClick={deletePost}>Delete</Button>
    </div>
  );
};

PostLink.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default PostLink;
