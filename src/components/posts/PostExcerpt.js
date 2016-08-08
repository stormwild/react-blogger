import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import ToggleComponent from '../common/ToggleComponent';

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
    let test2 = <Link to={"/blogs/" + params.blogId + "/posts/" + post.postId}>{post.title}</Link>;

    return (
      <div>
        <h1>
          <ToggleComponent
            condition={isEditing}
            ComponentIfTrue={test1}
            ComponentIfFalse={test2}
          />
          {!isEditing && <Button onClick={this.toggleEditing}>Edit</Button>}
          <Button onClick={deletePost}>Delete</Button>
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
