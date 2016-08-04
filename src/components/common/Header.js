import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

const Header = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Login</IndexLink>
      {" | "}
      <Link to="/blog/my-blog-post" activeClassName="active">Blog</Link>
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
