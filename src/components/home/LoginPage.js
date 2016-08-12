import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import toastr from 'toastr';
import {Row, Col, Grid} from 'react-bootstrap';
import TextInput from '../common/TextInput';
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

  handleSave() {
    axios.post('/api/login', this.state.user)
    .then(() => { window.location.href = '/blogs'; })
    .catch(err => { toastr.error('Invalid username / password'); });
  }

  render() {
    return (
      <div className="LoginPage">
        <Grid>
          <Row>
            <Col sm={6} smOffset={3}>
              <div className="heading">
                <h2>Sign in</h2>
                <form>
                  <div className="input-group input-group-lg">
                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                    <input type="text" className="form-control" placeholder="Username or email" />
                  </div>

                  <div className="input-group input-group-lg">
                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                    <input type="password" className="form-control" placeholder="Password" />
                  </div>

                  <button type="submit" className="float">Login</button>
                </form>
              </div>
            </Col>
          </Row>
        </Grid>
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
