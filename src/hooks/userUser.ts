import { useContext } from 'react'
import { AuthContext } from '../App'
import { Auth, User } from '../types'
import { useLocalStorage } from './useLocalStorage'

export const useUser = (): Auth => {
  const { user, setUser } = useContext(AuthContext)
  const { setItem } = useLocalStorage()

  const addUser = (user: User) => {
    setUser(user)
    setItem('user', JSON.stringify(user))
  }

  const removeUser = () => {
    setUser(null)
    setItem('user', '')
  }

  return { user, addUser, removeUser }
}
