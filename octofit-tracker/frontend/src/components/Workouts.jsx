import { useEffect, useState } from 'react'
import { getCollectionItems } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBasePath = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    fetch(`${apiBasePath}/api/workouts/`).then((response) => {
      if (!response.ok) throw new Error(`Unable to load workouts (${response.status})`)
      return response.json()
    }).then((payload) => setWorkouts(getCollectionItems(payload))).catch((loadError) => setError(loadError.message))
  }, [])
  return <section className="collection-page"><div className="page-heading"><p className="eyebrow">Build your session</p><h1>Workouts</h1><p className="lead">A little structure goes a long way.</p></div>{error ? <p className="inline-error">{error}. Check that the API is running.</p> : <div className="workout-list">{workouts.length ? workouts.map((workout, index) => <article className="workout-row" key={workout._id || workout.id || index}><span className="workout-icon">✦</span><span><strong>{workout.name || workout.title || `Workout ${index + 1}`}</strong><small>{workout.description || workout.type || 'Custom training plan'}</small></span><span className="workout-meta">{workout.duration ? `${workout.duration} min` : 'Start →'}</span></article>) : <p className="empty-state">No workouts available yet.</p>}</div>}</section>
}

export default Workouts