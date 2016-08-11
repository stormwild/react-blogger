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
      toggleEditingTitle,
      toggleEditingContent,
      isEditingTitle,
      isEditingContent
    } = this.props;

    let textareaTitle = (
      <TextArea
        name="post-title"
        onKeyDown={handleChange}
        onChange={handleChange}
        onBlur={toggleEditingTitle}
        value={post.title || ''} 
      />
    );

    let textareaContent = (
      <TextArea
        name="post-content"
        onKeyDown={handleChange}
        onChange={handleChange}
        onBlur={toggleEditingContent}
        value={post.content || ''} 
      />
    );

    return (
      <div>
        <h1>
          <ToggleComponent
            condition={isEditingTitle}
            componentIfTrue={textareaTitle}
            componentIfFalse={<div onClick={toggleEditingTitle}>{post.title}</div>}
          />
        </h1>
        <h2>
          <ToggleComponent
            condition={isEditingContent}
            componentIfTrue={textareaContent}
            componentIfFalse={<div onClick={toggleEditingContent}>{post.content}</div>}
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
