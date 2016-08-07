import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

class PostsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      post: {}
    }
  }

  componentDidMount() {
    let {user, params} = this.props;
    axios.get('/api/users/' + user.username + '/blogs/' + params.blogId + '/posts/' + params.postId)
    .then((res) => { this.setState({post: res.data}); })
    .catch(err => {throw err; });
  }

  render() {
    let {post} = this.state;
    return (
      <div>
        <h1>{post.title}</h1>
        <h2>{post.content}</h2>
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
