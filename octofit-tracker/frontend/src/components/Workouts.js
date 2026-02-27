import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts: fetching from', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Workouts: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setWorkouts(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts: fetch error', err);
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
        <span>Loading workouts…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container octofit-page">
        <div className="alert alert-danger" role="alert">
          <strong>Error loading workouts:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container octofit-page">
      <div className="octofit-card">
        <div className="octofit-card-header">
          <span>💪 Workouts</span>
          <span className="badge bg-light text-dark">{workouts.length} plans</span>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered octofit-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Workout Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr><td colSpan="3" className="text-center text-muted py-4">No workouts found.</td></tr>
              ) : (
                workouts.map((workout, index) => (
                  <tr key={workout._id || workout.id || index}>
                    <td className="text-muted">{index + 1}</td>
                    <td><span className="fw-semibold">{workout.name}</span></td>
                    <td>{workout.description}</td>
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

export default Workouts;
