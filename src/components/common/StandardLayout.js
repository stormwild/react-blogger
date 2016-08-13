import React, {PropTypes} from 'react';
import {Row, Col, Grid} from 'react-bootstrap';

// Wraps some commonly used bootstrap classes to achieve a 3-6-3 column layout
const StandardLayout = (props) => {
  return (
    <Grid>
      <Row>
        <Col xs={6} xsOffset={3}>
          {props.children}
        </Col>
      </Row>
    </Grid>
  );
};

StandardLayout.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default StandardLayout;
