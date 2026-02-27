import React from 'react';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/users',       label: 'Users' },
  { to: '/teams',       label: 'Teams' },
  { to: '/activities',  label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts',    label: 'Workouts' },
];

const homeCards = [
  { to: '/users',       icon: '👤', title: 'Users',       desc: 'Browse registered members' },
  { to: '/teams',       icon: '🏆', title: 'Teams',       desc: 'View teams and their members' },
  { to: '/activities',  icon: '🏃', title: 'Activities',  desc: 'Track logged workouts' },
  { to: '/leaderboard', icon: '📊', title: 'Leaderboard', desc: 'See who is on top' },
  { to: '/workouts',    icon: '💪', title: 'Workouts',    desc: 'Personalized workout plans' },
];

function HomePage() {
  return (
    <>
      <div className="octofit-hero">
        <img
          src="/octofitapp-small.png"
          alt="OctoFit"
          height="90"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <h1>OctoFit Tracker</h1>
        <p className="lead">Your all-in-one fitness tracking platform — log activities, compete with teams, and crush your goals.</p>
      </div>

      <div className="container">
        <div className="row g-3 justify-content-center">
          {homeCards.map((card) => (
            <div className="col-6 col-md-4 col-lg-2" key={card.to}>
              <Link to={card.to} className="octofit-nav-card card h-100 text-center">
                <div className="card-body">
                  <div className="nav-card-icon">{card.icon}</div>
                  <div className="card-title">{card.title}</div>
                  <div className="card-text">{card.desc}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img
              src="/octofitapp-small.png"
              alt="OctoFit"
              height="38"
              className="d-inline-block align-top me-2"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navItems.map((item) => (
                <li className="nav-item" key={item.to}>
                  <NavLink
                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                    to={item.to}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1">
        <Routes>
          <Route path="/"            element={<HomePage />} />
          <Route path="/users"       element={<Users />} />
          <Route path="/teams"       element={<Teams />} />
          <Route path="/activities"  element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts"    element={<Workouts />} />
        </Routes>
      </main>

      <footer className="octofit-footer">
        OctoFit Tracker &copy; {new Date().getFullYear()} — Built with React &amp; Django
      </footer>
    </div>
  );
}

export default App;
