import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { createContext } from 'react'
import { AuthContextData } from './types'
import { Container } from '@chakra-ui/react'

export const AuthContext = createContext<AuthContextData>({
  user: null,
  setUser: () => null,
  removeUser: () => null
})

export default function App () {
  // Creamos un contexto para pasar el estado de autenticación a los componentes hijos
  const { user, setUser, removeUser } = useAuth()

  if (user !== null) {
    return (
      <Navigate to='/login' />
    )
  } else {
    return (
      <Container maxW='2xl' py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <AuthContext.Provider value={{ user, setUser, removeUser }}>
          <Outlet />
        </AuthContext.Provider>
      </Container>
    )
  }
}
