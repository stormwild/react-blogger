import React, {PropTypes} from 'react';

const TextArea = ({onKeyDown, onChange, onBlur, value, name=''}) => {
  return (
    <div className="editable-container">
      <textarea
        name={name}
        className="editable" 
        autoFocus
        value={value}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onChange={onChange} />
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
