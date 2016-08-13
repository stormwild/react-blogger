import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import toastr from 'toastr';
import {Row, Col, Grid} from 'react-bootstrap';
import LoginForm from './LoginForm';
import './LoginPage.scss';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        username: '',
        password: ''
      }
    };
    
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleUsername(evt) {
    this.setState({user: {...this.state.user, username: evt.target.value}});
  }

  handlePassword(evt) {
    this.setState({user: {...this.state.user, password: evt.target.value}});
  }

  handleSave(evt) {
    evt.preventDefault(); // Prevents the form from performing any actions
    axios.post('/api/login', this.state.user)
    .then(() => { window.location.href = '/blogs'; })
    .catch(err => { toastr.error('Invalid username / password'); });
  }

  render() {
    return (
      <div className="LoginPage">
        <div className="page-wrapper">
          <Grid>
            <Row>
              <Col sm={6} smOffset={3}>
                <LoginForm
                  credentials={this.state.user}
                  handleUsername={this.handleUsername}
                  handlePassword={this.handlePassword}
                  handleSave={this.handleSave}
                />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(LoginPage);
