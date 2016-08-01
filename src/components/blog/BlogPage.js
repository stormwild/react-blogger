import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Editable from '../common/Editable';
import * as blogActions from '../../actions/blogActions';

class BlogPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {edit: true, content: ''};

    this.onEnter = this.onEnter.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadBlogPost(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    // Once the blog GET request finishes and is mapped to props, update state
    if (nextProps.blog) {
      this.setState({content: nextProps.blog.content});
    }
  }

  onClick() {
    this.setState({edit: true});
  }

  onChange(evt) {
    this.setState({content: evt.target.value});
  }

  onBlur() {
    this.setState({edit: false});
    let blog = Object.assign({}, this.props.blog);
    blog.content = this.state.content;
    this.props.actions.saveBlogPost(blog);
  }

  onEnter(evt) {
    if(evt.which === 13) {
      this.setState({edit: false});
      let blog = Object.assign({}, this.props.blog);
      blog.content = this.state.content;
      this.props.actions.saveBlogPost(blog);
    }
  }

  render() {
    let {edit, content} = this.state;

    return (
      <div>
        <h2>Blog Title</h2>
        
        <Editable
          edit={edit}
          onEnter={this.onEnter}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onClick={this.onClick}
          content={content}
         />
    </div>
    );
  }
}

BlogPage.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object,
  blog: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    blog: state.blog
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(blogActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);
