import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { path: '/', label: 'Overview', icon: '⌂' },
  { path: '/activities', label: 'Activities', icon: '↗' },
  { path: '/leaderboard', label: 'Leaderboard', icon: '◒' },
  { path: '/teams', label: 'Teams', icon: '◎' },
  { path: '/users', label: 'Users', icon: '◉' },
  { path: '/workouts', label: 'Workouts', icon: '✦' },
]

function Overview() {
  return (
    <section className="overview-page">
      <div className="page-heading">
        <p className="eyebrow">Command center</p>
        <h1>Move with purpose.</h1>
        <p className="lead">A clear view of your community&apos;s momentum, progress, and next best effort.</p>
      </div>
      <div className="overview-grid">
        <NavLink className="overview-card overview-card-primary" to="/activities">
          <span className="card-icon">↗</span>
          <span><strong>Log activity</strong><small>Capture the work that counts.</small></span>
          <span className="card-arrow">→</span>
        </NavLink>
        <NavLink className="overview-card" to="/leaderboard">
          <span className="card-icon">◒</span>
          <span><strong>See the leaderboard</strong><small>Find the teams setting the pace.</small></span>
          <span className="card-arrow">→</span>
        </NavLink>
        <NavLink className="overview-card" to="/workouts">
          <span className="card-icon">✦</span>
          <span><strong>Find a workout</strong><small>Make the next session count.</small></span>
          <span className="card-arrow">→</span>
        </NavLink>
      </div>
      <div className="overview-note">
        <span className="pulse-dot" />
        <span><strong>OctoFit Tracker</strong> is ready for your next rep.</span>
      </div>
    </section>
  )
}

function App() {
  const activeClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>octofit<small>TRACKER</small></span>
        </NavLink>
        <nav aria-label="Primary navigation">
          <p className="nav-label">Workspace</p>
          {navigation.map((item) => <NavLink className={activeClass} key={item.path} end={item.path === '/'} to={item.path}><span>{item.icon}</span>{item.label}</NavLink>)}
        </nav>
        <div className="sidebar-footer"><span className="status-dot" /> API connected</div>
      </aside>
      <main className="main-content">
        <header className="topbar"><span className="mobile-brand">OCTOFIT / TRACKER</span><span className="date-label">TRAIN TOGETHER · GO FURTHER</span></header>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
