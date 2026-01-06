// API utility functions with authentication
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('auth-token')

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return fetch(url, {
    ...options,
    headers,
  })
}

export const authenticatedFetch = apiRequest