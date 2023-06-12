import { Text, useToast, Grid, IconButton, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, Box } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { deleteUser, getAllUsers } from '../../services/userService'
import { Roles, userResponse } from '../../types.d'
import { MdDeleteForever } from 'react-icons/md'

export default function AdminUsers () {
  const [users, setUsers] = useState<userResponse[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number>()
  const onClose = () => setIsOpen(false)
  const toast = useToast()
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const usersFromApi = await getAllUsers()
      setUsers(usersFromApi)
    }

    void fetchUsers()
  }, [])

  const handleDelete = async (id: number) => {
    setUserToDelete(id)
    setIsOpen(true)
  }

  const confirmDelete = async () => {
    try {
      if (!userToDelete) return
      await deleteUser(userToDelete)
      setUsers(users.filter(user => user.id !== userToDelete))
      toast({
        title: 'Usuario eliminado',
        description: 'El usuario ha sido eliminado correctamente.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al eliminar el usuario.',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <Box>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {users.map(user => (
          <Box
            key={user.id}
            w='300px'
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
          >
            <Box p='6'>
              <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                isTruncated
              >
                {user.username}
              </Box>
              <Text mt='2'>{user.email}</Text>
            </Box>
            {!user.roles.find((role: { name: Roles }) => role.name === Roles.ROLE_ADMIN as Roles) &&
              <IconButton
                aria-label='Eliminar usuario'
                icon={<MdDeleteForever />}
                onClick={async () => await handleDelete(user.id)}
              />}
          </Box>
        ))}
      </Grid>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Eliminar Usuario
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro? No podrás deshacer esta acción.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={confirmDelete} ml={3}>
                Borrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}
