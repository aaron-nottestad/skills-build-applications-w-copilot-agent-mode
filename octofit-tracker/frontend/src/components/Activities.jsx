import { useEffect, useState } from 'react'
import { getCollectionItems } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiPath = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/activities/` : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    fetch(`${apiPath}`).then((response) => {
      if (!response.ok) throw new Error(`Unable to load activities (${response.status})`)
      return response.json()
    }).then((payload) => setActivities(getCollectionItems(payload))).catch((loadError) => setError(loadError.message))
  }, [])
  return <CollectionPage eyebrow="Movement log" title="Activities" intro="Every session adds up." error={error} empty="No activities logged yet."><div className="data-list">{activities.map((activity, index) => <article className="data-row" key={activity._id || activity.id || index}><span className="row-index">{String(index + 1).padStart(2, '0')}</span><span><strong>{activity.type || activity.name || 'Training session'}</strong><small>{activity.user || activity.username || 'Community member'}</small></span><b>{activity.duration ? `${activity.duration} min` : activity.points ? `${activity.points} pts` : 'Logged'}</b></article>)}</div></CollectionPage>
}

function CollectionPage({ eyebrow, title, intro, error, empty, children }) {
  return <section className="collection-page"><div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{intro}</p></div>{error ? <p className="inline-error">{error}. Check that the API is running.</p> : children.props.children.length === 0 ? <p className="empty-state">{empty}</p> : children}</section>
}

export default Activities