import { Navigate, Outlet } from 'react-router-dom'
import { Container } from '@chakra-ui/react'
import { AuthContext } from './context/AuthContext'
import { useUser } from './hooks/userUser'
import MainNavigation from './components/Shared/MainNavigation'
import Header from './components/Shared/Header'

export default function App () {
  const { user, addUser: setUser, removeUser } = useUser()

  if (user === null) {
    return (
      <Navigate to='/login' />
    )
  } else {
    return (
      <AuthContext.Provider value={{ user, setUser, removeUser }}>
        <Header />
        <Container
          maxW='2xl'
          minH='100vh'
          pb={12}
          pt={0}
          px={{ base: '2', sm: '8' }}
        >
          <Outlet />
        </Container>
        <MainNavigation />
      </AuthContext.Provider>
    )
  }
}
