import { useContext } from 'react'
import { AuthData } from '../../types'
import { AuthContext } from '../../App'
import { Link } from 'react-router-dom'

export default function Index () {
  const [authenticated, roles] = useContext<AuthData>(AuthContext)
  return (
    <div>
      <h1>Index</h1>
      <p>{authenticated.toString()}</p>
      <p>{
        roles.map((rol: string) => <span key={rol}>{rol}</span>)
      }
      </p>
      <Link to='exercises'>Workout Link</Link>
    </div>
  )
}
