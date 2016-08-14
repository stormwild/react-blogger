import React, {PropTypes} from 'react';
import Remarkable from 'remarkable';
import './MarkdownOutput.scss';

const MarkdownOutput = ({content}) => {
  const rawMarkup = () => {
    let md = new Remarkable();
    return { __html: md.render(content) || 'Live preview of the output will show here' };
  };

  return (
    <div
      className="MarkdownOutput"
      dangerouslySetInnerHTML={rawMarkup()} 
    />
  );
};

MarkdownOutput.propTypes = {
  content: PropTypes.string.isRequired
};

export default MarkdownOutput;