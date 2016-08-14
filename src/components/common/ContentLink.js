import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import './ContentLink.scss';

const ContentLink = ({url, title, isEditing, toggleEditing, deletePost}) => {
  return (
    <h2 className="ContentLink">
      <Link to={url}>{title}</Link>
      <div className="modify-buttons">
        {!isEditing && <i className="fa fa-pencil-square-o" onClick={toggleEditing}></i>}
        <i className="fa fa-times-circle" onClick={deletePost}></i>
      </div>
    </h2>
  );
};

ContentLink.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default ContentLink;
