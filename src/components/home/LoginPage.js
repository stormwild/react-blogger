import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

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
    this.state.user.username = evt.target.value;
    this.setState({user: this.state.user});
  }

  handlePassword(evt) {
    this.state.user.password = evt.target.value;
    this.setState({user: this.state.user});
  }

  handleSave() {
    axios.post('/api/login', this.state.user)
    .then(() => window.location.reload())
    .catch(err => { throw err });
  }

  render() {
    return (
      <div>
        Username
        <input 
          type="text"
          value={this.state.username}
          onChange={this.handleUsername}
        />
        <br/>
        Password
        <input 
          type="text"
          value={this.state.password}
          onChange={this.handlePassword}
        />
        <br/>
        <Button onClick={this.handleSave}>Login</Button>
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
