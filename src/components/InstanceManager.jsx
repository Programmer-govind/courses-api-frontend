import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/instances';

function InstanceManager({ courses }) {
  const [instances, setInstances] = useState([]);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseId, setCourseId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [details, setDetails] = useState(null);
  const [deleting, setDeleting] = useState('');

  const fetchInstances = async () => {
    setError('');
    setSuccess('');
    setDetails(null);
    if (!year || !semester) return;
    try {
      const res = await axios.get(`${API_URL}/${year}/${semester}`);
      setInstances(res.data);
    } catch (err) {
      setError('Failed to fetch instances');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await axios.post(API_URL, null, { params: { year, semester, courseId } });
      setSuccess('Instance created!');
      fetchInstances();
    } catch (err) {
      setError(err.response?.data || 'Failed to create instance');
    }
  };

  const handleDelete = async (inst) => {
    setDeleting(inst.id);
    setError(''); setSuccess('');
    try {
      await axios.delete(`${API_URL}/${inst.year}/${inst.semester}/${inst.course.courseId}`);
      setSuccess('Instance deleted!');
      fetchInstances();
    } catch (err) {
      setError(err.response?.data || 'Failed to delete instance');
    }
    setDeleting('');
  };

  const handleDetails = async (inst) => {
    setError('');
    try {
      const res = await axios.get(`${API_URL}/${inst.year}/${inst.semester}/${inst.course.courseId}`);
      setDetails(res.data);
    } catch (err) {
      setError('Failed to fetch details');
    }
  };

  return (
    <div>
      <h2>Course Instances</h2>
      <form className="mb-4" onSubmit={handleCreate}>
        <div className="row g-2 mb-2">
          <div className="col-md-2">
            <input className="form-control" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} required />
          </div>
          <div className="col-md-2">
            <input className="form-control" placeholder="Semester" value={semester} onChange={e => setSemester(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <select className="form-select" value={courseId} onChange={e => setCourseId(e.target.value)} required>
              <option value="">Select Course</option>
              {courses.map(c => (
                <option key={c.courseId} value={c.courseId}>{c.courseId} - {c.title}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Create Instance</button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Year</th>
            <th>Semester</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {instances.map(inst => (
            <tr key={inst.id}>
              <td>{inst.year}</td>
              <td>{inst.semester}</td>
              <td>{inst.course?.courseId} - {inst.course?.title}</td>
              <td>
                <button className="btn btn-info btn-sm me-2" onClick={() => handleDetails(inst)}>Details</button>
                <button className="btn btn-danger btn-sm" disabled={deleting === inst.id} onClick={() => handleDelete(inst)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {details && (
        <div className="alert alert-info mt-3">
          <strong>Instance Details:</strong><br />
          Year: {details.year}, Semester: {details.semester}, Course: {details.course?.courseId} - {details.course?.title}
        </div>
      )}
    </div>
  );
}

export default InstanceManager;
