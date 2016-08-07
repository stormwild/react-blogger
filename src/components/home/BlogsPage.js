import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router';

class BlogsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      blogs: []
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const {user} = this.props;
    axios.get('/api/users/' + user.username + '/blogs')
    .then(res => this.setState({blogs: res.data}))
    .catch(err => {throw err});
  }

  handleLogout() {
    axios.post('/api/logout', {})
    .then(() => window.location.reload())
    .catch(err => {throw err});
  }

  render() {
    let {blogs} = this.state;
    return (
      <div>
        <Button onClick={this.handleLogout}>Logout</Button>
        {blogs.map((blog, index) => {
          return (<h2 key={index}><Link to={"/blogs/" + blog.titleString}>{blog.title}</Link></h2>);
        })}
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
