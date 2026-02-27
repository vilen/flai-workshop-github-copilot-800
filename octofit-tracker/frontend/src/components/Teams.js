import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams: fetching from', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Teams: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setTeams(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
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
        <span>Loading teams…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container octofit-page">
        <div className="alert alert-danger" role="alert">
          <strong>Error loading teams:</strong> {error}
        </div>
      </div>
    );
  }

  const renderMembers = (members) => {
    const list = Array.isArray(members) ? members : (members ? [members] : []);
    return list.map((m, i) => (
      <span key={i} className="badge bg-secondary me-1">{m}</span>
    ));
  };

  return (
    <div className="container octofit-page">
      <div className="octofit-card">
        <div className="octofit-card-header">
          <span>🏆 Teams</span>
          <span className="badge bg-light text-dark">{teams.length} teams</span>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered octofit-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Team Name</th>
                <th>Members</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr><td colSpan="4" className="text-center text-muted py-4">No teams found.</td></tr>
              ) : (
                teams.map((team, index) => {
                  const members = Array.isArray(team.members) ? team.members : (team.members ? [team.members] : []);
                  return (
                    <tr key={team._id || team.id || index}>
                      <td className="text-muted">{index + 1}</td>
                      <td><span className="fw-semibold">{team.name}</span></td>
                      <td>{renderMembers(team.members)}</td>
                      <td><span className="badge bg-info text-dark">{members.length}</span></td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teams;
