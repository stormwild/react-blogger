import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import axios from 'axios';

class BlogsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const {user} = this.props;
    axios.get('/api/users/' + user.username + '/blogs')
    .then((blogs) => console.log(blogs))
    .catch(err => {throw err});
  }

  handleLogout() {
    axios.post('/api/logout', {})
    .then(() => window.location.reload())
    .catch(err => {throw err});
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleLogout}>Logout</Button>
      </div>
    );
  }
}

BlogsPage.propTypes = {
  //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(BlogsPage);
