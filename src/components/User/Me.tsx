import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'
import { GiTrafficCone } from 'react-icons/gi'

export default function Me () {
  // Monstramos un Alert diciendo que estamos en beta, y que no se puede acceder a esta página.
  return (
    <Alert
      status='info'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      py={6}
    >
      <AlertIcon as={GiTrafficCone} boxSize='40px' mr={0} />
      <AlertTitle
        mt={4}
        mb={1}
        me={0}
        fontSize='lg'
      >
        ¡No disponible!
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        Esta página aún no está disponible. ¡Pero no te preocupes! Estamos trabajando en ello.
      </AlertDescription>
    </Alert>
  )
}
