import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import LoginPage from './LoginPage';
import BlogsPage from './BlogsPage';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {user} = this.props;

    if (!user) {
      return (<LoginPage />);
    }
    return (<BlogsPage user={user} />);
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
