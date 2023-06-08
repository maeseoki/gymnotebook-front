import { Navigate, Outlet } from 'react-router-dom'
import { useGetUser } from './hooks/auth'
import { createContext } from 'react'
import { AuthData } from './types'

export const AuthContext = createContext<AuthData>([false, []])

export default function App () {
  // Creamos un contexto para pasar el estado de autenticación a los componentes hijos
  const [autenticated, roles] = useGetUser()

  if (!autenticated) {
    return (
      <Navigate to='/login' />
    )
  } else {
    return (
      <AuthContext.Provider value={[autenticated, roles]}>
        <Outlet />
      </AuthContext.Provider>
    )
  }
}
