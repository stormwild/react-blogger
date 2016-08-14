import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import ToggleComponent from '../common/ToggleComponent';
import TextArea from '../common/TextArea';
import ContentLink from '../common/ContentLink';
import axios from 'axios';
import toastr from 'toastr';
import * as constants from 'constants/constants';
import './BlogListItem.scss';

class BlogListItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {isEditing: false, blog: props.blog, lastValidTitle: props.blog.title};

    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    if (evt.which === 13) {
      this.toggleEditing();
      return;
    }
    this.setState({blog: {...this.state.blog, title: evt.target.value}});
  }

  toggleEditing() {
    const {blog, lastValidTitle, isEditing} = this.state;
    if(isEditing) {
      // Don't want to send a PUT request if the blog title didn't change
      if (blog.title === lastValidTitle) {
        this.setState({isEditing: !this.state.isEditing});
        return;
      }

      axios.put("/api/blogs/" + blog.blogId, {title: blog.title})
      .then(res => {
        // Need to update the entire blog after the PUT request to retreive the new postId
        this.setState({
          blog: res.data,
          lastValidTitle: res.data.title,
          isEditing: !isEditing
        });
        toastr.success('Blog title successfully changed');
      })
      .catch(err => {
        console.log(err.response);
        // If there's an error, set editing to false and roll back the title to its last valid state
        this.setState({
          isEditing: false,
          blog: {...blog, title: lastValidTitle}
        });
        toastr.error('There already exists a blog with title ' + blog.title);
      });
    }
    else {
      this.setState({isEditing: !this.state.isEditing});
    }
  }

  render() {
    const {params, deleteBlog} = this.props;
    let {blog, isEditing} = this.state;

    let textarea = (
      <TextArea
        onKeyDown={this.handleChange}
        onChange={this.handleChange}
        onBlur={this.toggleEditing}
        value={blog.title}
        initialHeight={constants.TEXTAREA_HEADER_HEIGHT}
      />
    );

    let blogLink = (
      <ContentLink
        url={"/blogs/" + blog.blogId} 
        title={blog.title}
        isEditing={isEditing}
        toggleEditing={this.toggleEditing}
        deletePost={deleteBlog}
      />
    );

    return (
      <div className="BlogListItem">
        <ToggleComponent
          condition={isEditing}
          componentIfTrue={textarea}
          componentIfFalse={blogLink}
        />
        <p>{blog.content}</p>
      </div>
    );
  }
}

BlogListItem.propTypes = {
  blog: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

export default BlogListItem;
