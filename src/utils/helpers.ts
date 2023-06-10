import { JwtPayload } from '../types'

export const parseJwt = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split('.')[1]
    if (base64Url === undefined) return null
    const base64 = base64Url.replace(/-/g, '+').replace(/_/, '/')
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(jsonPayload)
  } catch (e) {
    console.error(e)
    return null
  }
}
