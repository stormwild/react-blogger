import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import * as loginActions from '../../actions/loginActions';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        username: '',
        password: ''
      }
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onUsernameChange(evt) {
    let user = this.state.user;
    user.username = evt.target.value;
    this.setState({user: user});
  }

  onPasswordChange(evt) {
    let user = this.state.user;
    user.password = evt.target.value;
    this.setState({user: user});
  }

  onSave() {
    this.props.actions.login(this.state.user)
      .then(() => this.context.router.push('/blog/testuser1'))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Grid>
        Username 
        <input 
          type="text"
          className="form-control"
          value={this.state.username}
          onChange={this.onUsernameChange}
        />
        Password 
        <input 
          type="text"
          className="form-control"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <Button onClick={this.onSave}>Login</Button>
      </Grid>
    );
  }
}

LoginPage.propTypes = {
  //myProp: PropTypes.string.isRequired
};

LoginPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
