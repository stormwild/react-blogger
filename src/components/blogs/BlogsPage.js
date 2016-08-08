import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router';

class BlogsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      blogs: []
    };

    this.handleNewBlog = this.handleNewBlog.bind(this);
  }

  componentDidMount() {
    const {user} = this.props;
    axios.get('/api/users/' + user.username + '/blogs')
    .then(res => this.setState({blogs: res.data}))
    .catch(err => {throw err});
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
    .catch(err => {throw err; });
  }

  render() {
    let {blogs} = this.state;
    return (
      <div>
        {blogs.map((blog, index) => {
          return (<h2 key={index}><Link to={"/blogs/" + blog.blogId}>{blog.title}</Link></h2>);
        })}
        <Button onClick={this.handleNewBlog}>New Blog</Button>
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
