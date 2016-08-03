import React, {PropTypes} from 'react';

const TextArea = ({onEnter, onChange, onBlur, value}) => {
  return (
    <div className="editable-container">
      <textarea
        className="editable" 
        autoFocus
        placeholder="Blog content..."
        value={value}
        onKeyDown={onEnter}
        onBlur={onBlur}
        onChange={onChange} />
    </div>
  );
};

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  onBlur: PropTypes.func
};

export default TextArea;
