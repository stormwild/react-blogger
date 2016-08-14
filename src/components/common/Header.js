import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {browserHistory} from 'react-router';
import StandardLayout from './StandardLayout';
import classNames from 'classnames';
import './Header.scss';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {dropdownSelected: false};

    this.handleBack = this.handleBack.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
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

  toggleMenu() {
    this.setState({dropdownSelected: !this.state.dropdownSelected});
  }

  render() {
    const {user} = this.props;
    let userDropdownClass = classNames({
      'user-dropdown': true,
      'selected': this.state.dropdownSelected
    });

    if (!user) {
      return (<div></div>);
    }
    return (
      <div className="Header">
        <StandardLayout>
          <button className="primary back-button" onClick={this.handleBack}>
            <i className="fa fa-chevron-left"></i>
          </button>
          <h1>React Blog</h1>
          <div className="user-dropdown-container">
            <ul className={userDropdownClass} onClick={this.toggleMenu}>
              <li>
                <i className="fa fa-user"></i>
                <span className="username">{user.username}</span>
                <ul>
                  <li onClick={this.handleLogout}>Logout</li>
                </ul>
              </li>
            </ul>
          </div>
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
