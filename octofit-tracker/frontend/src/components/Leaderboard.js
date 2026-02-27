import React, { useState, useEffect } from 'react';

function rankClass(rank) {
  if (rank === 1) return 'rank-badge rank-1';
  if (rank === 2) return 'rank-badge rank-2';
  if (rank === 3) return 'rank-badge rank-3';
  return 'rank-badge rank-other';
}

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard: fetching from', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setEntries(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="octofit-loading">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span>Loading leaderboard…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container octofit-page">
        <div className="alert alert-danger" role="alert">
          <strong>Error loading leaderboard:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container octofit-page">
      <div className="octofit-card">
        <div className="octofit-card-header">
          <span>📊 Leaderboard</span>
          <span className="badge bg-light text-dark">{entries.length} players</span>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered octofit-table mb-0">
            <thead>
              <tr>
                <th style={{width: '70px'}}>Rank</th>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr><td colSpan="3" className="text-center text-muted py-4">No leaderboard entries found.</td></tr>
              ) : (
                entries.map((entry, index) => (
                  <tr key={entry._id || entry.id || index}>
                    <td>
                      <span className={rankClass(index + 1)}>{index + 1}</span>
                    </td>
                    <td><span className="fw-semibold">{entry.user}</span></td>
                    <td>
                      <span className="badge bg-success fs-6">{entry.score}</span>
                    </td>
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

export default Leaderboard;
