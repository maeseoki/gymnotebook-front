import { Navigate, Outlet } from 'react-router-dom'
import { Container } from '@chakra-ui/react'
import { AuthContext } from './context/AuthContext'
import { useUser } from './hooks/userUser'

export default function App () {
  const { user, addUser: setUser, removeUser } = useUser()

  if (user === null) {
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
