import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import './PostLink.scss';

const PostLink = ({url, title, isEditing, toggleEditing, deletePost}) => {
  return (
    <h2 className="PostLink">
      <Link to={url}>{title}</Link>
      <div className="modify-buttons">
        {!isEditing && <i className="fa fa-pencil-square-o" onClick={toggleEditing}></i>}
        <i className="fa fa-times-circle" onClick={deletePost}></i>
      </div>
    </h2>
  );
};

PostLink.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default PostLink;
