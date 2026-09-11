import { useEffect, useState } from 'react'
import { getCollectionItems } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBasePath = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/teams/` : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    fetch(`${apiBasePath}`).then((response) => {
      if (!response.ok) throw new Error(`Unable to load teams (${response.status})`)
      return response.json()
    }).then((payload) => setTeams(getCollectionItems(payload))).catch((loadError) => setError(loadError.message))
  }, [])
  return <CollectionPage eyebrow="Your crew" title="Teams" intro="Find your people and keep moving." error={error} empty="No teams created yet."><div className="tile-grid">{teams.map((team, index) => <article className="team-tile" key={team._id || team.id || index}><span className="tile-number">{String(index + 1).padStart(2, '0')}</span><h2>{team.name || `Team ${index + 1}`}</h2><p>{team.members?.length || team.memberCount || 0} members</p><span className="tile-link">View team →</span></article>)}</div></CollectionPage>
}

function CollectionPage({ eyebrow, title, intro, error, empty, children }) {
  return <section className="collection-page"><div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{intro}</p></div>{error ? <p className="inline-error">{error}. Check that the API is running.</p> : children.props.children.length === 0 ? <p className="empty-state">{empty}</p> : children}</section>
}

export default Teams