import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Activities: fetching from', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Activities: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setActivities(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
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
        <span>Loading activities…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container octofit-page">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img"><use xlinkHref="#exclamation-triangle-fill"/></svg>
          <div><strong>Error loading activities:</strong> {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container octofit-page">
      <div className="octofit-card">
        <div className="octofit-card-header">
          <span>🏃 Activities</span>
          <span className="badge bg-light text-dark">{activities.length} records</span>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered octofit-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Activity Type</th>
                <th>Duration (min)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr><td colSpan="5" className="text-center text-muted py-4">No activities found.</td></tr>
              ) : (
                activities.map((activity, index) => (
                  <tr key={activity._id || activity.id || index}>
                    <td className="text-muted">{index + 1}</td>
                    <td><span className="fw-semibold">{activity.user}</span></td>
                    <td><span className="badge bg-primary">{activity.activity_type}</span></td>
                    <td>{activity.duration}</td>
                    <td>{activity.date}</td>
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

export default Activities;
