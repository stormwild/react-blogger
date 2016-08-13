import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import './PostLink.scss';

const PostLink = ({url, title, isEditing, toggleEditing, deletePost}) => {
  return (
    <div className="PostLink">
      <Link className="post-link" to={url}>{title}</Link>
      <div className="modify-buttons">
        {!isEditing && <i className="fa fa-pencil-square-o" onClick={toggleEditing}></i>}
        <i className="fa fa-times-circle" onClick={deletePost}></i>
      </div>
    </div>
  );
};

PostLink.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default PostLink;
