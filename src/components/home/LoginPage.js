import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import toastr from 'toastr';
import {Grid} from 'react-bootstrap';
import TextInput from '../common/TextInput';

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
      <Grid>
        <TextInput
          name="username"
          label=""
          placeholder="Username or email"
          value={this.state.username}
          onChange={this.handleUsername}
        />
        <TextInput
          name="password"
          type="password"
          label=""
          placeholder="Password"
          value={this.state.password}
          onChange={this.handlePassword}
        />  
        <Button onClick={this.handleSave}>Login</Button>
      </Grid>
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
