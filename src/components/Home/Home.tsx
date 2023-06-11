import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { AuthContextData } from '../../types'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Text, Flex } from '@chakra-ui/react'
import { GiTrafficCone } from 'react-icons/gi'
import { Link as RouterLink } from 'react-router-dom'

export default function Home () {
  const { user } = useContext<AuthContextData>(AuthContext)
  return (
    <Card align='center'>
      <CardHeader>
        <Heading size='md'>Bienvenido {user?.name ?? 'de nuevo'}!</Heading>
      </CardHeader>
      <CardBody pt={0}>
        <Flex justifyContent='center'>
          <GiTrafficCone size='50px' />
        </Flex>
        <Text>Recuerda que aún estamos en fase Beta. Puede que haya algo que no funcione. ¡No te preocupes! Estamos trabajando en ello 👷</Text>
      </CardBody>
      <CardFooter>
        <Button as={RouterLink} to='/workout'>¡Entrenar!</Button>
      </CardFooter>
    </Card>
  )
}
