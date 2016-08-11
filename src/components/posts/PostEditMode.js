import React, {PropTypes} from 'react';
import TextArea from '../common/TextArea';
import ToggleComponent from '../common/ToggleComponent';

class PostEditMode extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {
      post, 
      handleChange,
      toggleEditing,
      isEditingTitle,
      isEditingContent
    } = this.props;

    let textareaTitle = (
      <TextArea
        onKeyDown={handleChange.bind(this, 'post-title')}
        onChange={handleChange.bind(this, 'post-title')}
        onBlur={toggleEditing.bind(this, 'post-title')}
        value={post.title || ''} 
      />
    );

    let textareaContent = (
      <TextArea
        onKeyDown={handleChange.bind(this, 'post-content')}
        onChange={handleChange.bind(this, 'post-content')}
        onBlur={toggleEditing.bind(this, 'post-content')}
        value={post.content || ''} 
      />
    );

    return (
      <div>
        <h1>
          <ToggleComponent
            condition={isEditingTitle}
            componentIfTrue={textareaTitle}
            componentIfFalse={<div onClick={toggleEditing.bind(this, 'post-title')}>{post.title}</div>}
          />
        </h1>
        <h2>
          <ToggleComponent
            condition={isEditingContent}
            componentIfTrue={textareaContent}
            componentIfFalse={<div onClick={toggleEditing.bind(this, 'post-content')}>{post.content}</div>}
          />
        </h2>
      </div>
    );
  }
}

PostEditMode.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default PostEditMode;
