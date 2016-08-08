import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import {Link} from 'react-router';

class BlogPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {blog: {}, posts: []};
  }

  componentDidMount() {
    const {user, params} = this.props;

    function getBlogData() {
      return axios.get('/api/users/' + user.username + '/blogs/' + params.blogId);
    }

    function getPostsData() {
      return axios.get('/api/users/' + user.username + '/blogs/' + params.blogId + '/posts');
    }

    axios.all([getBlogData(), getPostsData()])
    .then(axios.spread((blog, posts) => {
      this.setState({blog: blog.data, posts: posts.data});
    }))
    .catch(err => {throw err});
  }

  render() {
    let {blog, posts} = this.state;
    const {params} = this.props;
    return (
      <div>
        <h1>{blog.title}</h1>
        {posts.map((post, index) => {
          return (
            <h1 key={index}>
              <Link to={"/blogs/" + params.blogId + "/posts/" + post.postId}>{post.title}</Link>
            </h1>
          );
        })}
      </div>
    );
  }
}

BlogPage.propTypes = {
  //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(BlogPage);
