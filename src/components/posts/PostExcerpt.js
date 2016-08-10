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

    this.state = {isEditing: false, post: props.post, lastValidTitle: props.post.title};

    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    if (evt.which === 13) {
      this.toggleEditing();
      return;
    }
    this.setState({post: {...this.state.post, title: evt.target.value}});
  }

  toggleEditing() {
    const {post, lastValidTitle, isEditing} = this.state;

    if(isEditing) {
      axios.put("/api/posts/" + post.postId, {title: post.title})
      .then(res => {
        // Need to update the entire post after the PUT request to retreive the new postId
        this.setState({
          post: res.data,
          lastValidTitle: res.data.title,
          isEditing: !isEditing
        });
        toastr.success('Blog title successfully changed');
      })
      .catch(err => {
        console.log(err.response);
        // If there's an error, set editing to false and roll back the title to its last valid state
        this.setState({
          isEditing: false,
          post: {...post, title: lastValidTitle}
        });
        toastr.error('There already exists a blog with title ' + post.title);
      });
    }
    else {
      this.setState({isEditing: !this.state.isEditing});
    }
  }

  render() {
    const {params, editPostTitle, deletePost} = this.props;
    let {post, isEditing} = this.state;

    let textarea = (
      <TextArea
        onKeyDown={this.handleChange}
        onChange={this.handleChange}
        onBlur={this.toggleEditing}
        value={post.title} 
      />
    );

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
