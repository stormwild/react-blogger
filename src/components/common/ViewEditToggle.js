import React, {PropTypes} from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';

const ViewEditToggle = ({isEditMode, viewMode, editMode}) => {
  let activeClass = "primary";
  let passiveClass = "info";
  let viewModeClass = isEditMode ? passiveClass : activeClass;
  let editModeClass = isEditMode ? activeClass : passiveClass;

  return (

    <ButtonGroup>
      <Button onClick={viewMode} bsStyle={viewModeClass}>View</Button>
      <Button onClick={editMode} bsStyle={editModeClass}>Edit</Button>
    </ButtonGroup>
  );
};

ViewEditToggle.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default ViewEditToggle;
