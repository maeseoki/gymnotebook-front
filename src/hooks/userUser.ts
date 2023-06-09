
import { Auth, Role, Roles, User } from '../types'
import { useLocalStorage } from './useLocalStorage'
import { parseJwt } from '../utils/helpers'

export const useUser = (): Auth => {
  const { value: token, setItem, removeItem } = useLocalStorage('token')

  // Si el token no existe, no está autenticado
  if (token === null) return { user: null, addUser: () => null, removeUser: () => null }

  const decodedToken = parseJwt(token)

  // Si el token no es válido, no está autenticado
  if (decodedToken === null) return { user: null, addUser: () => null, removeUser: () => null }

  // Si el token ha expirado, no está autenticado
  const now = Date.now().valueOf() / 1000
  if (decodedToken.exp < now) return { user: null, addUser: () => null, removeUser: () => null }

  // Extraemos los roles a un array de strings
  const roles: Roles[] = decodedToken.roles.map((role: Role) => role.authority)

  const user: User = {
    authenticated: true,
    name: decodedToken.sub,
    authToken: token,
    roles
  }

  const addUser = (token: string | null) => {
    if (token === null) {
      removeItem('token')
    } else {
      setItem('token', token)
    }
  }

  const removeUser = () => {
    removeItem('token')
  }

  return { user, addUser, removeUser }
}
