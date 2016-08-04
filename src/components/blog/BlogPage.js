import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import MarkdownOutput from '../common/MarkdownOutput';
//import Editable from '../common/Editable';
import TextArea from '../common/TextArea';
import * as blogActions from '../../actions/blogActions';

class BlogPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    let self = this;

    let blog = props.blogs.find(blog => {
      return blog.titleString === self.props.params.blogId;
    });

    this.state = {edit: true, content: blog.title};

    // Bindings
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
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

  onSave(evt) {
    this.setState({edit: false});
    let blog = Object.assign({}, this.props.blog);
    blog.content = this.state.content;
    this.props.actions.saveBlogPost(blog);
  }

  render() {
    let {edit, content} = this.state;

    return (
      <Grid>
        <Button className="save-blog" onClick={this.onSave}>Save</Button>
        <Row>
          <Col xs={6}>
            <TextArea
              value={content}
              onChange={this.onChange} />
          </Col>
          <Col xs={6}>
          <MarkdownOutput
            content ={content} />
          </Col>
        </Row>
    </Grid>
    );
  }
}

BlogPage.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object,
  user: PropTypes.object.isRequired,
  blogs: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);
