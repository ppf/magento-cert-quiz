function getHeaders() {
  const headers = { 'Content-Type': 'application/json' }
  const token = localStorage.getItem('token')
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

function handleResponse(res) {
  if (res.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
    return Promise.reject(new Error('Unauthorized'))
  }
  return res.json()
}

const api = {
  get: (url) => fetch(url, { headers: getHeaders() }).then(handleResponse),
  post: (url, data) => fetch(url, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(handleResponse),
}
export default api
