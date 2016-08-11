import React, {PropTypes} from 'react';
// import actions here

class PostViewMode extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        PostViewMode
      </div>
    );
  }
}

PostViewMode.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default PostViewMode;
