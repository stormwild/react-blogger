import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Button} from 'react-bootstrap';
import axios from 'axios';
import {browserHistory} from 'react-router';
import StandardLayout from './StandardLayout';
import './Header.scss';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleBack = this.handleBack.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleBack() {
    browserHistory.goBack();
  }

  handleLogout() {
    const {routing} = this.props;
    axios.post('/api/logout', {})
    .then(() => {
      if (routing.locationBeforeTransitions.pathname === '/') {
        window.location.reload();
      }
      else {
        window.location.href = '/';
      }
    })
    .catch(err => { throw err; });
  }

  render() {
    const {user} = this.props;

    if (!user) {
      return (<div></div>);
    }
    return (
      <div className="Header">
        <StandardLayout>
          <Button className="back-button" onClick={this.handleBack}>
            <i className="fa fa-chevron-left"></i>
          </Button>
          <h1>React Bootstrap</h1>
          <Button className="logout-button" onClick={this.handleLogout}>Logout</Button>
        </StandardLayout>
      </div>
    );
  }
}

Header.propTypes = {
  //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    routing: state.routing
  };
}

export default connect(mapStateToProps)(Header);
