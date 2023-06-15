import { Workout } from '../types'
import { apiClient } from '../utils/apiClient'

export const getAllWorkouts = async (): Promise<Workout[]> => {
  const response = await apiClient.get('workout')
  return response.data
}

export const saveWorkout = async (workout: Workout): Promise<void> => {
  const response = await apiClient.post('workout', workout)
  return response.data
}
