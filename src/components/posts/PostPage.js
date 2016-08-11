import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import TextArea from '../common/TextArea';
import ToggleComponent from '../common/ToggleComponent';
import ViewEditToggle from '../common/ViewEditToggle';
import toastr from 'toastr';

class PostsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      post: {},
      lastValidTitle: '',
      isEditingTitle: false,
      isEditingContent: false,
      isEditMode: true
    };

    this.toggleEditingTitle = this.toggleEditingTitle.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.toggleEditingContent = this.toggleEditingContent.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.activateEditMode = this.activateEditMode.bind(this);
    this.activateViewMode = this.activateViewMode.bind(this);
  }

  componentDidMount() {
    let {user, params} = this.props;
    axios.get('/api/users/' + user.username + '/blogs/' + params.blogId + '/posts/' + params.postId)
    .then((res) => { this.setState({post: res.data, lastValidTitle: res.data.title}); })
    .catch(err => {throw err; });
  }

  handleChangeTitle(evt) {
    if (evt.which === 13) {
      this.toggleEditingTitle();
      return;
    }
    this.setState({post: {...this.state.post, title: evt.target.value}});
  }

  toggleEditingTitle() {
    const {post, lastValidTitle, isEditingTitle} = this.state;

    if (isEditingTitle) {
      axios.put("/api/posts/" + post.postId, {title: post.title})
      .then(res => {
        // Need to update the entire post after the PUT request to retreive the new postId
        this.setState({
          post: res.data,
          lastValidTitle: res.data.title,
          isEditingTitle: !isEditingTitle
        });
      })
      .catch(err => {
        console.log(err.response);
        // If there's an error, set editing to false and roll back the title to its last valid state
        this.setState({
          isEditingTitle: false,
          post: {...post, title: lastValidTitle}
        });
        toastr.error('There already exists a post with title ' + post.title);
      });        
    }
    else {
      this.setState({isEditingTitle: !isEditingTitle});
    }
  }

  handleChangeContent(evt) {
    if (evt.which === 13) {
      this.toggleEditingContent();
      return;
    }
    this.setState({post: {...this.state.post, content: evt.target.value}});
  }

  toggleEditingContent() {
    const {post, isEditingContent} = this.state;

    if (isEditingContent) {
      axios.put("/api/posts/" + post.postId, {content: post.content})
      .then(res => {
        // Need to update the entire post after the PUT request to retreive the new postId
        this.setState({
          post: res.data,
          isEditingContent: !isEditingContent
        });
      })
      .catch(err => {
        console.log(err.response);
      });        
    }
    else {
      this.setState({isEditingContent: !isEditingContent});
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

  render() {
    let {post, isEditingTitle, isEditingContent, isEditMode} = this.state;

    let textareaTitle = (
      <TextArea
        onKeyDown={this.handleChangeTitle}
        onChange={this.handleChangeTitle}
        onBlur={this.toggleEditingTitle}
        value={post.title || ''} 
      />
    );

    let textareaContent = (
      <TextArea
        onKeyDown={this.handleChangeContent}
        onChange={this.handleChangeContent}
        onBlur={this.toggleEditingContent}
        value={post.content || ''} 
      />
    );

    return (
      <div>
        <ViewEditToggle
          isEditMode={isEditMode}
          editMode={this.activateEditMode}
          viewMode={this.activateViewMode}
        />
        <h1>
          <ToggleComponent
            condition={isEditingTitle}
            componentIfTrue={textareaTitle}
            componentIfFalse={<div onClick={this.toggleEditingTitle}>{post.title}</div>}
          />
        </h1>
        <h2>
          <ToggleComponent
            condition={isEditingContent}
            componentIfTrue={textareaContent}
            componentIfFalse={<div onClick={this.toggleEditingContent}>{post.content}</div>}
          />
        </h2>
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
