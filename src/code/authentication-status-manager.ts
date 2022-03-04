import axios from 'axios'

export async function isAuthenticated () {
  try {
    await axios.get('api/check-auth')
    return true
  } catch (error) {
    return false
  }
}
