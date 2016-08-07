import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import {Link} from 'react-router';

class BlogPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {posts: []};
  }

  componentDidMount() {
    const {user, params} = this.props;
    axios.get('/api/users/' + user.username + '/blogs/' + params.blogId + '/posts')
    .then(res => { this.setState({posts: res.data}); })
    .catch(err => {if (err) throw err});
  }

  render() {
    let {posts} = this.state;
    const {params} = this.props;
    return (
      <div>
        {posts.map((post, index) => {
          return (
            <h1 key={index}>
              <Link to={"/blogs/" + params.blogId + "/posts/" + post.titleString}>{post.title}</Link>
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
