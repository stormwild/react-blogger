import React, {PropTypes} from 'react';

const TextArea = ({onKeyDown, onChange, onBlur, value}) => {
  return (
    <div className="editable-container">
      <textarea
        className="editable" 
        value={value}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onChange={onChange}
        autoFocus />
    </div>
  );
};

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func
};

export default TextArea;
