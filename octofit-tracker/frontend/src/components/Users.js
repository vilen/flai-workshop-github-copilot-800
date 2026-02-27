import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Users: fetching from', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Users: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setUsers(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="octofit-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span>Loading users…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container octofit-page">
        <div className="alert alert-danger" role="alert">
          <strong>Error loading users:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container octofit-page">
      <div className="octofit-card">
        <div className="octofit-card-header">
          <span>👤 Users</span>
          <span className="badge bg-light text-dark">{users.length} members</span>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered octofit-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Age</th>
                <th>Fitness Goal</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="5" className="text-center text-muted py-4">No users found.</td></tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id || user.id || index}>
                    <td className="text-muted">{index + 1}</td>
                    <td><span className="fw-semibold">{user.username}</span></td>
                    <td><a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a></td>
                    <td>{user.age}</td>
                    <td><span className="badge bg-success">{user.fitness_goal}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
