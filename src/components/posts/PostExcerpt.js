import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import ToggleComponent from '../common/ToggleComponent';
import TextArea from '../common/TextArea';
import PostLink from './PostLink';
import axios from 'axios';
import toastr from 'toastr';

class PostExcerpt extends React.Component {
  constructor(props, context) {
    super(props, context);

    const {post} = props;
    this.state = {isEditing: false, title: post.title};

    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    if (evt.which === 13) {
      this.toggleEditing();
      return;
    }
    this.setState({title: evt.target.value});
  }

  toggleEditing() {
    const {post} = this.props;

    if(this.state.isEditing) {
      axios.put("/api/posts/" + post.postId, {title: this.state.title})
      .then(res => {
        toastr.success('Blog title successfully changed');
        this.setState({isEditing: !this.state.isEditing});
      })
      .catch(err => {console.log(err);})
    }
    else {
      this.setState({isEditing: !this.state.isEditing});
    }
  }

  render() {
    const {post, params, editPostTitle, deletePost} = this.props;
    let {isEditing, title} = this.state;

    let textarea = (
      <TextArea
        onKeyDown={this.handleChange}
        onChange={this.handleChange}
        onBlur={this.toggleEditing}
        value={title} 
      />
    );

    let postLink = (
      <PostLink
        url={"/blogs/" + params.blogId + "/posts/" + post.postId} 
        title={title}
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
            componentIfTrue={textarea}
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
