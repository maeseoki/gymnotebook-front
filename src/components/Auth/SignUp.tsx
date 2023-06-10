import { useToast, Container, Box, Stack, Heading, HStack, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUpUser } from '../../services/authService'
import Logo from '../Shared/Logo'
import { PasswordField } from './PasswordFIeld'
import { Roles, SignUpRequest } from '../../types'

export default function SignUp () {
  const navigate = useNavigate()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [signupRequest, setSignupRequest] = useState<SignUpRequest>({
    username: '',
    password: '',
    email: '',
    role: ['ROLE_USER' as Roles]
  })

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signUpUser(signupRequest)
      navigate('/login') // redirect to login after successful signup
      toast({
        title: 'Success',
        description: 'Account created successfully, please login',
        status: 'success',
        duration: 4000,
        isClosable: true,
        variant: 'top-accent'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to create account',
        status: 'error',
        duration: 4000,
        isClosable: true,
        variant: 'top-accent'
      })
      console.error('Error during signup: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '2', sm: '8' }}>
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Logo />
          <Heading as='h1' size='xl' textAlign='center'>
            The Gym Notebook
          </Heading>
          <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
            <Heading size={{ base: 'xs', md: 'sm' }}>Crea una nueva cuenta</Heading>
            <HStack spacing='1' justify='center'>
              <Text color='muted' pe={1}>¿Ya tienes una cuenta?</Text>
              <Button variant='link' colorScheme='primary' onClick={() => navigate('/login')}>
                Inicia sesión aquí
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '4', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'gray.900', sm: 'bg-surface' }}
          boxShadow={{ base: 'md' }}
          borderRadius={{ base: 'xl' }}
        >
          <form onSubmit={handleSignUp}>
            <Stack spacing='6'>
              <Stack spacing='5'>
                <FormControl>
                  <FormLabel htmlFor='username'>Nombre de usuario</FormLabel>
                  <Input id='username' type='text' value={signupRequest.username} onChange={e => setSignupRequest({ ...signupRequest, username: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input id='email' type='email' value={signupRequest.email} onChange={e => setSignupRequest({ ...signupRequest, email: e.target.value })} />
                </FormControl>
                <PasswordField value={signupRequest.password} onChange={e => setSignupRequest({ ...signupRequest, password: e.target.value })} />
              </Stack>
              <Stack spacing='6'>
                <Button type='submit' isLoading={loading} loadingText='Creating account...' variant='outline'>Crear cuenta</Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  )
}
