import React, {PropTypes} from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import fetchApi from '../../api/fetchApi';
import axios from 'axios';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    //fetchApi.post('/logout')
    //.then(() => browserHistory.push('/'));
    axios.post('/api/logout', {})
    .then(response => {
      window.location.reload(); // Fully reload the page
    })
    .catch(err => console.log(err));
  }

  render() {
    const { user, loading } = this.props;
    return (
      <nav>
        {
          user ? 
          <Button onClick={this.handleClick}>Logout</Button> : 
          <IndexLink to="/" activeClassName="active">Login</IndexLink>
        }
        {" | "}
        <Link to="/blogs" activeClassName="active">Blogs</Link>
      </nav>
    );
  }
}

// User can be an object or undefined
Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.any.isRequired
};

export default Header;
