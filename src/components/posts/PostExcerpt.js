import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import ToggleComponent from '../common/ToggleComponent';
import TextArea from '../common/TextArea';
import ContentLink from '../common/ContentLink';
import axios from 'axios';
import toastr from 'toastr';
import MarkdownOutput from '../common/MarkdownOutput';
import './PostExcerpt.scss';

class PostExcerpt extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {isEditing: false, post: props.post, lastValidTitle: props.post.title};

    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    if (evt.which === 13) {
      this.toggleEditing();
      return;
    }
    this.setState({post: {...this.state.post, title: evt.target.value}});
  }

  toggleEditing() {
    const {post, lastValidTitle, isEditing} = this.state;

    if(isEditing) {
      axios.put("/api/posts/" + post.postId, {title: post.title})
      .then(res => {
        // Need to update the entire post after the PUT request to retreive the new postId
        this.setState({
          post: res.data,
          lastValidTitle: res.data.title,
          isEditing: !isEditing
        });
        toastr.success('Post title successfully changed');
      })
      .catch(err => {
        console.log(err.response);
        // If there's an error, set editing to false and roll back the title to its last valid state
        this.setState({
          isEditing: false,
          post: {...post, title: lastValidTitle}
        });
        toastr.error('There already exists a post with title ' + post.title);
      });
    }
    else {
      this.setState({isEditing: !this.state.isEditing});
    }
  }

  generatePostExcerpt(content) {
    /* Generates a blog post excerpt from the full content of the post */
    let postExcerpt = '';
    let contentArr = content.split('\n\n');
    let markupRegex = /^[#->`]+.*$/g;
    // If the post starts with a header such as "# My blog", include it in the excerpt
    // Once a paragraph is found that doesn't start with a special markup character, return the accumulated content
    for(var i = 0; i < contentArr.length; ++i) {
      postExcerpt += contentArr[i] + '\n\n';
      if (!markupRegex.test(contentArr[i])) {
        return postExcerpt.slice(0, -2); // Need to strip away the last two newlines
      }
    }
    return content;
  }

  render() {
    const {params, deletePost} = this.props;
    let {post, isEditing} = this.state;

    let textarea = (
      <TextArea
        onKeyDown={this.handleChange}
        onChange={this.handleChange}
        onBlur={this.toggleEditing}
        value={post.title} 
      />
    );

    let postLink = (
      <ContentLink
        url={"/blogs/" + params.blogId + "/posts/" + post.postId} 
        title={post.title}
        isEditing={isEditing}
        toggleEditing={this.toggleEditing}
        deletePost={deletePost}
        className="post-link"
      />
    );

    return (
      <div className="PostExcerpt">
        <ToggleComponent
          condition={isEditing}
          componentIfTrue={textarea}
          componentIfFalse={postLink}
          className="editable-post-title"
        />
        <MarkdownOutput content={this.generatePostExcerpt(post.content)} />
        <Link className="read-more" to={"/blogs/" + params.blogId + "/posts/" + post.postId}>Read More</Link>
        <hr/>
      </div>
    );
  }
}

PostExcerpt.propTypes = {
  post: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

export default PostExcerpt;
