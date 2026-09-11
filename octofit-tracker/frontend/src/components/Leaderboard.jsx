import { useEffect, useState } from 'react'
import { getCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getCollection('leaderboard').then(setEntries).catch((loadError) => setError(loadError.message)) }, [])
  return <section className="collection-page"><div className="page-heading"><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1><p className="lead">Progress is better when it is shared.</p></div>{error ? <p className="inline-error">{error}. Check that the API is running.</p> : <div className="ranking-list">{entries.length ? entries.map((entry, index) => <article className={`ranking-row rank-${index + 1}`} key={entry._id || entry.id || index}><span className="rank">{String(index + 1).padStart(2, '0')}</span><span><strong>{entry.team || entry.name || entry.username || 'Team member'}</strong><small>{entry.activities || entry.activityCount || 'Active'} activities</small></span><b>{entry.points || entry.score || 0}<small> pts</small></b></article>) : <p className="empty-state">No rankings available yet.</p>}</div>}</section>
}

export default Leaderboard