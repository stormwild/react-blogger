import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import ToggleComponent from '../common/ToggleComponent';
import PostLink from './PostLink';

class PostExcerpt extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {isEditing: false};

    this.toggleEditing = this.toggleEditing.bind(this);
  }

  toggleEditing() {
    this.setState({isEditing: !this.state.isEditing});
  }

  render() {
    const {post, params, editPostTitle, deletePost} = this.props;
    let {isEditing} = this.state;

    let test1 = <Button onClick={this.toggleEditing}>I'm off</Button>;
    let postLink = (
      <PostLink
        url={"/blogs/" + params.blogId + "/posts/" + post.postId} 
        title={post.title}
        isEditing={isEditing}
        toggleEditing={this.toggleEditing}
        deletePost={deletePost}
      />
    );

    return (
      <div>
        <h1>
          <ToggleComponent
            condition={isEditing}
            componentIfTrue={test1}
            componentIfFalse={postLink}
          />
        </h1>
        <p>{post.content}</p>
      </div>
    );
  }
}

PostExcerpt.propTypes = {
  post: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

export default PostExcerpt;
