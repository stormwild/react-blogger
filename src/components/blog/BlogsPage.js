import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as blogActions from '../../actions/blogActions';

class BlogsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {blogs: props.blogs};
  }

  componentDidMount() {
    this.props.actions.loadBlogs(this.props.user.username);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.blogs) {
      this.setState({blogs: nextProps.blogs});
    }
  }

  render() {
    return (
      <div>
        <h1>Blogs page</h1>
        { this.state.blogs.map(blog => <h3>{blog.title}</h3>) }
      </div>
    );
  }
}

BlogsPage.propTypes = {
  //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    blogs: state.blogs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(blogActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogsPage);
