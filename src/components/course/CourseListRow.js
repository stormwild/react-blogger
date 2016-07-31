import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course, onDelete}) => {
  return (
    <tr>
      <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
      <td><button className="btn btn-primary" onClick={onDelete.bind(this, course)}>Delete</button></td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CourseListRow;
