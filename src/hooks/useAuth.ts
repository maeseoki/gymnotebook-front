import { useContext } from 'react'
import { Auth, AuthContextData, JwtPayload, Role, Roles, User } from '../types'
import { useLocalStorage } from './useLocalStorage'
import { AuthContext } from '../App'

export function useAuth (): Auth {
  const { user, setUser } = useContext<AuthContextData>(AuthContext)
  // Obtenemos el token del localStorage
  const { getItem, setItem } = useLocalStorage()

  const token = getItem('token')

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

  const addUser = (user: User | null) => {
    setUser(user)
    setItem('user', JSON.stringify(user))
  }

  const removeUser = () => {
    setUser(null)
    setItem('user', '')
  }

  // Devolvemos el usuario y la función para actualizarlo
  return {
    user: {
      authenticated: true,
      name: decodedToken.sub,
      authToken: token,
      roles
    },
    addUser,
    removeUser
  }
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
