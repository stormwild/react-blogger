import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

class BlogPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {blog: {}};
  }

  componentDidMount() {
    const {user, params} = this.props;
    axios.get('/api/users/' + user.username + '/blogs/' + params.blogId + '/posts')
    .then(res => { this.setState({blog: res.data[0]}); })
    .catch(err => {if (err) throw err});
  }

  render() {
    let {blog} = this.state;
    return (
      <div>
        <h1>{blog.title}</h1>
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
