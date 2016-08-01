import React, {PropTypes} from 'react';

const TextArea = ({onEnter, onChange, onBlur, value}) => {
  return (
    <textarea 
      autoFocus
      cols="30"
      rows="10"
      placeholder="Blog content..."
      value={value}
      onKeyDown={onEnter}
      onBlur={onBlur}
      onChange={onChange} />
  );
};

TextArea.propTypes = {
  onEnter: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default TextArea;
