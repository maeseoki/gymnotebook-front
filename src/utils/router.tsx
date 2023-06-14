import { createBrowserRouter } from 'react-router-dom'
import Exercises from '../components/Exercises/Exercises'
import Me from '../components/User/Me'
import Workout from '../components/Workout/Workout'
import Login from '../components/Auth/Login'
import App from '../App'
import Home from '../components/Home/Home'
import SignUp from '../components/Auth/SignUp'
import Admin from '../components/Admin/Admin'
import AdminUsers from '../components/Admin/AdminUsers'
import Exercise from '../components/Exercises/Exercise'
import ExercisesWrapper from '../components/Exercises/ExercisesWrapper'

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'workout/*', element: <Workout /> }, // Añado /* para que funcione el nested routing definido en Workout.tsx
      {
        path: 'exercises',
        element: <ExercisesWrapper />,
        children: [
          { index: true, element: <Exercises /> },
          { path: 'new', element: <Exercise /> },
          { path: ':id', element: <Exercise /> }
        ]
      },
      { path: 'me', element: <Me /> },
      {
        path: 'admin',
        element: <Admin />,
        children: [
          { index: true, element: <AdminUsers /> }
        ]
      }
    ]
  }
])
