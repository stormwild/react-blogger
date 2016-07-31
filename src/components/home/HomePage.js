import React from 'react';
import {Link} from 'react-router';
import {fetchApi} from '../../api/fetchApi';

class HomePage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {route1: 'empty', route2: 'empty'};
  }

  componentDidMount() {
    let self = this;
    fetchApi('/route1').then(res => {
      self.setState({route1: res.route});
    });
    fetchApi('/route2').then(res => {
      self.setState({route2: res.route});
    });
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Pluralsight Administration</h1>
        <h2>Route 1: {this.state.route1}</h2>
        <h2>Route 2: {this.state.route2}</h2>
        <p>React, Redux and React Router in ES6 for ultra-responsive web apps.</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
      </div>
    );
  }
}

export default HomePage;
