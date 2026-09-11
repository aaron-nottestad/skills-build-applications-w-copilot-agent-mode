import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getCollection('users').then(setUsers).catch((loadError) => setError(loadError.message)) }, [])
  return <section className="collection-page"><div className="page-heading"><p className="eyebrow">Community</p><h1>Users</h1><p className="lead">The people behind the progress.</p></div>{error ? <p className="inline-error">{error}. Check that the API is running.</p> : <div className="user-grid">{users.length ? users.map((user, index) => <article className="user-card" key={user._id || user.id || index}><span className="avatar">{(user.name || user.username || 'U').charAt(0).toUpperCase()}</span><span><strong>{user.name || user.username || `Member ${index + 1}`}</strong><small>{user.email || user.team || 'OctoFit member'}</small></span></article>) : <p className="empty-state">No users available yet.</p>}</div>}</section>
}

export default Users