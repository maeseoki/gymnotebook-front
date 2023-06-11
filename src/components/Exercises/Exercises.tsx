import { Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function Exercises () {
  return (
    <div>
      <Button as={RouterLink} to='/exercises/new'>Nuevo Ejercicio</Button>
    </div>
  )
}
