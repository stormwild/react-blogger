import React, {PropTypes} from 'react';

const ToggleComponent = ({condition, componentIfTrue, componentIfFalse}) => {
  return (
    <div className="ToggleComponent">
      {condition ? componentIfTrue : componentIfFalse}
    </div>
  );
};

ToggleComponent.propTypes = {
  condition: PropTypes.bool.isRequired,
  componentIfTrue: PropTypes.node.isRequired,
  componentIfFalse: PropTypes.node.isRequired
};

export default ToggleComponent;
