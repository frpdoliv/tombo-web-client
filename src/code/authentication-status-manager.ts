import axios from 'axios'

export async function fetchAuthenticationState () {
  try {
    await axios.get('api/check-auth')
    sessionStorage.setItem('authenticated', 'true')
    return true
  } catch (error) {
    sessionStorage.setItem('authenticated', 'false')
    return false
  }
}

export function isAuthenticated () {
  return (sessionStorage.getItem('authenticated') === 'true')
}
