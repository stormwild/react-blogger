import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import toastr from 'toastr';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import PostExcerpt from '../posts/PostExcerpt';
import StandardLayout from '../common/StandardLayout';
import './BlogPage.scss';

class BlogPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {blog: {}, posts: []};

    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
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
    .catch(err => {throw err; });
  }

  handleNewPost() {
    const {user, params} = this.props;
    let {posts} = this.state;

    const postTitle = window.prompt('Title of new post?');
    axios.post('/api/posts', {userId: user.username, blogId: params.blogId, title: postTitle})
    .then(res => { 
      posts.push(res.data);
      this.setState({posts: posts});
     })
    .catch(err => {
      if (err.response.status === 500 && err.response.data.error === 'duplicate entry') {
        toastr.error('There already exists a post with title ' + postTitle);
      }
    });
  }

  handleDeletePost(index) {
    let {posts} = this.state;
    let postId = posts[index].postId;
    axios.delete('/api/posts/' + postId)
    .then(res => {
      toastr.success('Post deleted successfully');
      this.setState({posts: posts.filter((post, i) => i !== index)});
    })
    .catch(err => { throw err; });
  }

  render() {
    let {blog, posts} = this.state;
    const {params} = this.props;
    return (
      <div className="BlogPage">
        <StandardLayout>
          <h1 className="blog-title">{blog.title}</h1>
          <button className="primary new-post-button" onClick={this.handleNewPost}>New Post</button>
          <hr/>
          {posts.map((post, index) => {
            return (
              // The key cannot be the same as index
              // has something to do with the key auto-updating when you delete elements out of order
              <PostExcerpt 
                key={post._id}
                post={post}
                params={params}
                deletePost={this.handleDeletePost.bind(this, index)}
              />
            );
          })}
        </StandardLayout>
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
