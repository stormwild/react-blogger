import React, {PropTypes} from 'react';
import './LoginForm.scss';

const LoginForm = ({credetials, handleUsername, handlePassword, handleSave}) => {
  return (
    <div className="LoginForm">
      <div className="position-container">
        <div className="heading">
          <h2>Sign in</h2>
          <form>
            <div className="input-group input-group-lg">
              <span className="input-group-addon"><i className="fa fa-user"></i></span>
              <input 
                type="text"
                className="form-control"
                placeholder="Username or email"
                onChange={handleUsername}
              />
            </div>

            <div className="input-group input-group-lg">
              <span className="input-group-addon"><i className="fa fa-lock"></i></span>
              <input 
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={handlePassword}
              />
            </div>

            <button className="primary login-button" onClick={handleSave}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default LoginForm;
