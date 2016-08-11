import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import ViewEditToggle from '../common/ViewEditToggle';
import PostViewMode from './PostViewMode';
import PostEditMode from './PostEditMode';
import toastr from 'toastr';
import {Button} from 'react-bootstrap';

class PostsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      post: {},
      isEditingTitle: false,
      isEditingContent: false,
      isEditMode: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.activateEditMode = this.activateEditMode.bind(this);
    this.activateViewMode = this.activateViewMode.bind(this);
    this.savePost = this.savePost.bind(this);
  }

  componentDidMount() {
    let {user, params} = this.props;
    axios.get('/api/users/' + user.username + '/blogs/' + params.blogId + '/posts/' + params.postId)
    .then((res) => { this.setState({post: res.data}); })
    .catch(err => {throw err; });
  }

  handleChange(name, evt) {
    let isTitle = name === 'post-title';
    let isContent = name === 'post-content';

    if (isTitle || isContent) {
      if (evt.which === 13) {
        this.toggleEditing(name);
        return;
      }
      isTitle ?
      this.setState({post: {...this.state.post, title: evt.target.value}}) :
      this.setState({post: {...this.state.post, content: evt.target.value}});
    }
  }

  activateEditMode() {
    if (!this.state.isEditMode) {
      this.setState({isEditMode: true});
    }
  }

  activateViewMode() {
    if (this.state.isEditMode) {
      this.setState({isEditMode: false});
    }
  }

  savePost() {
    let {post} = this.state;

    axios.put("/api/posts/" + post.postId, {title: post.title, content: post.content})
    .then(res => {
      this.setState({post: res.data});
      toastr.success('Post successfully saved');
    })
    .catch(err => {
      console.error(err.response);
      toastr.error('Error: Post couldn\'t be saved');
    });
  }

  render() {
    let {post, isEditingTitle, isEditingContent, isEditMode} = this.state;

    return (
      <div>
        <ViewEditToggle
          isEditMode={isEditMode}
          editMode={this.activateEditMode}
          viewMode={this.activateViewMode}
        />
        <Button onClick={this.savePost}>Save</Button>

        {
          isEditMode ?
          <PostEditMode
            post={post}
            handleChange={this.handleChange}
            isEditingTitle={isEditingTitle}
            isEditingContent={isEditingContent}
            /> :

          <PostViewMode post={post} />
        }
      </div>
    );
  }
}

PostsPage.propTypes = {
  //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(PostsPage);
