import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';

const PostLink = ({url, title, isEditing, toggleEditing, deletePost}) => {
  return (
    <div>
      <Link to={url}>{title}</Link>
      {!isEditing && <i className="fa fa-pencil-square-o" onClick={toggleEditing}></i>}
      <i className="fa fa-times-circle" onClick={deletePost}></i>
    </div>
  );
};

PostLink.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default PostLink;
