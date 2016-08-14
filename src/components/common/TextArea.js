import React, {PropTypes} from 'react';
import './TextArea.scss';

const TextArea = ({onKeyDown, onChange, onBlur, value, initialHeight}) => {
  return (
      <textarea
        className="TextArea" 
        value={value}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onChange={onChange}
        autoFocus
        style={{height: initialHeight}}
      />
  );
};

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func
};

export default TextArea;
