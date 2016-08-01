import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Editable from '../common/Editable';

class BlogPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {edit: true, content: ''};

    this.onEnter = this.onEnter.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onClick() {
    this.setState({edit: true});
  }

  onChange(evt) {
    this.setState({content: evt.target.value});
  }

  onBlur() {
    this.setState({edit: false});
  }

  onEnter(evt) {
    if(evt.which === 13) {
      this.setState({edit: false});
    }
  }

  render() {
    let {edit, content} = this.state;

    return (
      <div>
        <h2>Blog Title</h2>
        
        <Editable
          edit={edit}
          onEnter={this.onEnter}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onClick={this.onClick}
          content={content}
         />
    </div>
    );
  }
}

BlogPage.propTypes = {
  //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    state: state
  };
}

/*function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}*/

export default connect(mapStateToProps/*, mapDispatchToProps*/)(BlogPage);
