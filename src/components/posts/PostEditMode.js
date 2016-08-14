import React, {PropTypes} from 'react';
import TextArea from '../common/TextArea';
import {Grid, Row, Col} from 'react-bootstrap';
import MarkdownOutput from '../common/MarkdownOutput';

class PostEditMode extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {post, handleChange} = this.props;

    return (
      <Grid>
        <Row>
          <Col sm={6}>
            <TextArea
              onChange={handleChange.bind(this, 'post-title')}
              value={post.title || ''}
              initialHeight={'45px'}
            />
            <TextArea
              onChange={handleChange.bind(this, 'post-content')}
              value={post.content || ''}
              initialHeight={'750px'}
            />
          </Col>
          <Col sm={6}>
            <h1 className="blog-title"><MarkdownOutput content={post.title || ''} /></h1>
            <MarkdownOutput content={post.content || ''} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

PostEditMode.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default PostEditMode;
