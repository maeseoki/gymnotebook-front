import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { AuthContextData } from '../../types'

export default function Home () {
  const { user } = useContext<AuthContextData>(AuthContext)
  return (
    <div>
      <h1>Index</h1>
      <p>{user?.authenticated.toString()}</p>
      <p>{
        user?.roles?.map((rol: string) => <span key={rol}>{rol}</span>)
      }
      </p>
      <Link to='exercises'>Workout Link</Link>
    </div>
  )
}
