import React, {PropTypes} from 'react';

const ToggleComponent = ({condition, ComponentIfTrue, ComponentIfFalse}) => {
  return (
    <div>
      {condition ? ComponentIfTrue : ComponentIfFalse}
    </div>
  );
};

ToggleComponent.propTypes = {
  condition: PropTypes.bool.isRequired,
  ComponentIfTrue: PropTypes.node.isRequired,
  ComponentIfFalse: PropTypes.node.isRequired
};

export default ToggleComponent;
