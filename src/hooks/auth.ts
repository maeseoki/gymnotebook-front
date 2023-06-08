import { AuthContextData, JwtPayload, Role, Roles } from '../types'
// Creamos la interfaz para el hook. Puede ser un array de dos elementos:
// - El primero es un booleano que indica si está autenticado o no
// - El segundo es un array de strings con los roles del usuario
// O también puede
export function useGetUser (): AuthContextData {
  const token = localStorage.getItem('token')

  // Si el token no existe, no está autenticado
  if (token === null) return {}

  const decodedToken = parseJwt(token)

  // Si el token no es válido, no está autenticado
  if (decodedToken === null) return [false, []]

  const authenticated = true

  // Si el token ha expirado, no está autenticado
  const now = Date.now().valueOf() / 1000
  if (decodedToken.exp < now) return [false, []]

  // Extraemos los roles a un array de strings
  const roles: Roles[] = decodedToken.roles.map((role: Role) => role.authority)

  // const rol = 'user'
  return [authenticated, roles]
}

const parseJwt = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split('.')[1]
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
