import React, {PropTypes} from 'react';
import Remarkable from 'remarkable';

const MarkdownOutput = ({onClick, content}) => {
  const rawMarkup = () => {
    let md = new Remarkable();
    return { __html: md.render(content) || 'Live preview of the output will show here' };
  };

  return (
    <div
      className="markdown-output"
      dangerouslySetInnerHTML={rawMarkup()} 
      onClick={onClick} />
  );
};

MarkdownOutput.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default MarkdownOutput;
