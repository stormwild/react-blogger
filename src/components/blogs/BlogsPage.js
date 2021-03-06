import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import toastr from 'toastr';
import {Link} from 'react-router';
import BlogList from './BlogList';
import StandardLayout from '../common/StandardLayout';
import './BlogsPage.scss';

class BlogsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      blogs: []
    };

    this.handleNewBlog = this.handleNewBlog.bind(this);
    this.handleDeleteBlog = this.handleDeleteBlog.bind(this);
  }

  componentDidMount() {
    const {user} = this.props;
    axios.get('/api/users/' + user.username + '/blogs')
    .then(res => this.setState({blogs: res.data}))
    .catch(err => { throw err; });
  }

  handleNewBlog() {
    const {user, params} = this.props;
    let {blogs} = this.state;

    const blogTitle = window.prompt('Title of new blog?');
    axios.post('/api/blogs', {userId: user.username, title: blogTitle})
    .then(res => {
      blogs.push(res.data);
      this.setState({blogs: blogs});
    })
    .catch(err => {
      if (err.response.status === 500 && err.response.data.error === 'duplicate entry') {
        toastr.error('There already exists a blog with title ' + blogTitle);
        console.error(err.response); // This is the best way of debugging the error in the console
      }
    });
  }

  handleDeleteBlog(index) {
    let {blogs} = this.state;
    let blogId = blogs[index].blogId;
    axios.delete('/api/blogs/' + blogId)
    .then(res => {
      toastr.success('Blog deleted successfully');
      this.setState({blogs: blogs.filter((blog, i) => i !== index)});
    })
    .catch(err => { throw err; });
  }

  render() {
    let {blogs} = this.state;
    const {params} = this.props;
    return (
      <div className="BlogsPage">
        <StandardLayout>
          <button className="primary new-blog-button" onClick={this.handleNewBlog}>New Blog</button>
          <BlogList 
            blogs={blogs}
            params={params}
            handleDeleteBlog={this.handleDeleteBlog}
            handleNewBlog={this.handleNewBlog}
          />
        </StandardLayout>
      </div>
    );
  }
}

BlogsPage.propTypes = {
  //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(BlogsPage);
