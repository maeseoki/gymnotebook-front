import { useContext } from 'react'
import { AuthContextData } from '../../types'
import { AuthContext } from '../../App'
import { Link } from 'react-router-dom'

export default function Index () {
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
