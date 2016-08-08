import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import LoginPage from './LoginPage';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // If user is logged in, immediately redirect to /blogs
    if (props.user) {
      browserHistory.push('/blogs');
    }
  }

  render() {
    return (<LoginPage />);
  }
}

HomePage.propTypes = {
  //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(HomePage);
