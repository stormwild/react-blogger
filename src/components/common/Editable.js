import React, {PropTypes} from 'react';
import TextArea from './TextArea';
import CustomDiv from './CustomDiv';

const Editable = ({edit, onEnter, onChange, onBlur, onClick, content}) => {
  return (
    <div>
      {edit ? 
      <TextArea
        onEnter={onEnter}
        onChange={onChange}
        onBlur={onBlur}
        value={content} />
      :
      <CustomDiv
        onClick={onClick} 
        content={content} />
      }
    </div>
  );
}

Editable.propTypes = {
  edit: PropTypes.bool.isRequired,
  onEnter: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired
};

export default Editable;
