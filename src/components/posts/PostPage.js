import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import ViewEditToggle from '../common/ViewEditToggle';
import PostViewMode from './PostViewMode';
import PostEditMode from './PostEditMode';
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

    this.handleChange = this.handleChange.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.activateEditMode = this.activateEditMode.bind(this);
    this.activateViewMode = this.activateViewMode.bind(this);
  }

  componentDidMount() {
    let {user, params} = this.props;
    axios.get('/api/users/' + user.username + '/blogs/' + params.blogId + '/posts/' + params.postId)
    .then((res) => { this.setState({post: res.data, lastValidTitle: res.data.title}); })
    .catch(err => {throw err; });
  }

  toggleEditing(name) {
    const {post, isEditingTitle, isEditingContent} = this.state;
    let isTitle = name === 'post-title';
    let isContent = name === 'post-content';
    
    if (isTitle || isContent) {
      if (isEditingTitle || isEditingContent) {
        let payload = isTitle ? {title: post.title} : {content: post.content};
        axios.put("/api/posts/" + post.postId, payload)
        .then(res => {
          // Need to update the entire post after the PUT request to retreive the new postId
          let stateObj = isTitle ? 
            {post: res.data, lastValidTitle: res.data.title, isEditingTitle: !isEditingTitle} : 
            {post: res.data, isEditingContent: !isEditingContent};

          this.setState(stateObj);
        })
        .catch(err => {
          console.log(err.response);
        });        
      }
      else {
        isTitle ?
        this.setState({isEditingTitle: !isEditingTitle}) :
        this.setState({isEditingContent: !isEditingContent});
      }      
    }
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

  render() {
    let {post, isEditingTitle, isEditingContent, isEditMode} = this.state;

    return (
      <div>
        <ViewEditToggle
          isEditMode={isEditMode}
          editMode={this.activateEditMode}
          viewMode={this.activateViewMode}
        />

        {
          isEditMode ?
          <PostEditMode
            post={post}
            handleChange={this.handleChange}
            toggleEditing={this.toggleEditing}
            isEditingTitle={isEditingTitle}
            isEditingContent={isEditingContent}
            /> :

          <PostViewMode />
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
