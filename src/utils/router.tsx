import { createBrowserRouter } from 'react-router-dom'
import Exercises from '../components/Exercises/Exercises'
import Index from '../components/Index/Index'
import Me from '../components/User/Me'
import Workout from '../components/Workout/Workout'
import Login from '../components/login/Login'
import App from '../App'

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: 'workout', element: <Workout /> },
      { path: 'exercises', element: <Exercises /> },
      { path: 'me', element: <Me /> }
    ]
  }
])
