import React, {PropTypes} from 'react';
import StandardLayout from '../common/StandardLayout';
import MarkdownOutput from '../common/MarkdownOutput';
import PostOutput from './PostOutput';

class PostViewMode extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {post} = this.props;
    
    return (
      <StandardLayout>
        <PostOutput post={post} />
      </StandardLayout>
    );
  }
}

PostViewMode.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default PostViewMode;
