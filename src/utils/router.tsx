import { createBrowserRouter } from 'react-router-dom'
import Exercises from '../components/Exercises/Exercises'
import Me from '../components/User/Me'
import Workout from '../components/Workout/Workout'
import Login from '../components/Auth/Login'
import App from '../App'
import Home from '../components/Home/Home'
import SignUp from '../components/Auth/SignUp'

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'workout', element: <Workout /> },
      { path: 'exercises', element: <Exercises /> },
      { path: 'me', element: <Me /> }
    ]
  }
])
