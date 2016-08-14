import React, {PropTypes} from 'react';
import MarkdownOutput from '../common/MarkdownOutput';
import './PostOutput.scss';

const PostOutput = ({post}) => {
  return (
    <div className="PostOutput">
      <h1 className="blog-title">{post.title || ''}</h1>
      <MarkdownOutput content={post.content || ''} />
    </div>
  );
};

PostOutput.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default PostOutput;
