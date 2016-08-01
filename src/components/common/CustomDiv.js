import React, {PropTypes} from 'react';

const CustomDiv = ({onClick, content}) => {
  return (
    <div onClick={onClick}>{content}</div>
  );
};

CustomDiv.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CustomDiv;
