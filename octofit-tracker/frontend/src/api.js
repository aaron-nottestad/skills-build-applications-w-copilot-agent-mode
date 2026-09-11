const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  if (payload.data && typeof payload.data === 'object') return getItems(payload.data)
  return []
}

export async function getCollection(component) {
  const response = await fetch(`${API_BASE_URL}/api/${component}/`)
  if (!response.ok) throw new Error(`Unable to load ${component} (${response.status})`)
  return getItems(await response.json())
}