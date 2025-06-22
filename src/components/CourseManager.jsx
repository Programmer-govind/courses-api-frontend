import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/courses';

function CourseManager({ courses, onCourseCreated }) {
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [description, setDescription] = useState('');
  const [prerequisites, setPrerequisites] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleting, setDeleting] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await axios.post(API_URL, {
        courseId,
        title,
        description,
        prerequisites: prerequisites.map(cid => ({ courseId: cid }))
      });
      setSuccess('Course created!');
      setTitle(''); setCourseId(''); setDescription(''); setPrerequisites([]);
      if (onCourseCreated) onCourseCreated();
    } catch (err) {
      setError(err.response?.data || 'Failed to create course');
    }
  };

  const handleDelete = async (cid) => {
    setDeleting(cid);
    setError(''); setSuccess('');
    try {
      await axios.delete(`${API_URL}/${cid}`);
      setSuccess('Course deleted!');
      if (onCourseCreated) onCourseCreated();
    } catch (err) {
      setError(err.response?.data || 'Failed to delete course');
    }
    setDeleting('');
  };

  return (
    <div>
      <h2>Courses</h2>
      <form className="mb-4" onSubmit={handleCreate}>
        <div className="row g-2 mb-2">
          <div className="col-md-2">
            <input className="form-control" placeholder="Course ID" value={courseId} onChange={e => setCourseId(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="col-md-3">
            <select className="form-select" multiple value={prerequisites} onChange={e => setPrerequisites(Array.from(e.target.selectedOptions, o => o.value))}>
              {courses.map(c => (
                <option key={c.courseId} value={c.courseId}>{c.courseId} - {c.title}</option>
              ))}
            </select>
            <small className="text-muted">Hold Ctrl/Cmd to select multiple prerequisites</small>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Create Course</button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Prerequisites</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.courseId}>
              <td>{c.courseId}</td>
              <td>{c.title}</td>
              <td>{c.description}</td>
              <td>{c.prerequisites?.map(p => p.courseId).join(', ')}</td>
              <td>
                <button className="btn btn-danger btn-sm" disabled={deleting === c.courseId} onClick={() => handleDelete(c.courseId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseManager;
