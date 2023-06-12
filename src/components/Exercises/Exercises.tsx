import { useState, useEffect } from 'react'
import { Box, Button, Heading, Text, Flex, Image, LinkBox, LinkOverlay, Skeleton, useToast, Icon, HStack, SimpleGrid } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { getAllExercises } from '../../services/exerciseService'
import { ExerciseTypeWithImage } from '../../types.d'
import defaultExerciseImg from '../../assets/images/default-exercise.jpg'
import { GiBiceps } from 'react-icons/gi'
import { IoBarbell } from 'react-icons/io5'
import { muscleGroupNames, exerciseTypeNames } from '../../utils/maps'

export default function Exercises () {
  const [exercises, setExercises] = useState<ExerciseTypeWithImage[]>([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  // Cuando se monta el componente, obtenemos todos los ejercicios.
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const result = await getAllExercises()
        // Seteamos la imagen por defecto para cada ejercicio.
        setExercises(
          result.map((exercise: ExerciseTypeWithImage) => ({
            ...exercise,
            imageUrl: defaultExerciseImg
          }))
        )
      } catch (error) {
        console.error(error)
        toast({
          title: 'Error al obtener los ejercicios',
          description: 'Ha ocurrido un error al obtener los ejercicios',
          status: 'error'
        })
      } finally {
        setLoading(false)
      }
    }
    // Usamos void para que no se queje de que no estamos haciendo nada con la promesa (ya controlamos el error en el catch)
    void fetchExercises()
  }, [toast])

  return (
    <Box p={5} mx='auto'>
      <Button
        as={RouterLink}
        to='/exercises/new'
        width='full'
        mb={5}
      >Nuevo Ejercicio
      </Button>
      <Heading
        as='h2'
        size='lg'
        mb={5}
        textAlign='center'
      >Mis Ejercicios
      </Heading>
      {exercises.length === 0 && !loading && (
        <>
          <Heading
            as='h3'
            size='md'
            textAlign='center'
            mb={5}
          >Aún no tienes ningun ejercicio.
          </Heading>
          <Text textAlign='center' mb={5}>Crea uno nuevo para empezar a entrenar!</Text>
        </>
      )}
      <Skeleton isLoaded={!loading}>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          wrap={{ base: 'nowrap', sm: 'wrap' }}
          justifyContent='space-between'
          mb={5}
        >
          {exercises.map(exercise => (
            <LinkBox
              as={Flex}
              direction='column'
              borderWidth='1px'
              borderRadius='lg'
              overflow='hidden'
              w='full'
              p={{ base: 2, sm: 4 }}
              mb={5}
              key={exercise.id}
              role='group'
            >
              <SimpleGrid
                columns={2}
                templateColumns='80px 2fr'
                alignItems='center'
                gap={{ base: 2, sm: 4 }}
              >
                <Image
                  borderRadius='full'
                  boxSize='80px'
                  border='1px dashed var(--chakra-colors-primary-400)'
                  src={exercise.imageId ? `${import.meta.env.VITE_API_URL as string}image/${exercise.imageId}` : defaultExerciseImg}
                  fallbackSrc={defaultExerciseImg}
                  alt={exercise.name}
                  loading='lazy'
                  mb={5}
                />
                <Box>
                  <Heading
                    as='h3'
                    size='md'
                    fontSize={{ base: 'lg', sm: 'xl' }}
                    mb={2}
                    _groupHover={{ color: 'primary.500' }}
                  >
                    <LinkOverlay as={RouterLink} to={`/exercises/${exercise.id ?? 0}`}>{exercise.name}</LinkOverlay>
                  </Heading>
                  <Flex justifyContent='space-between' wrap='wrap'>
                    <HStack><Icon as={GiBiceps} /> <Text fontSize='sm' color='gray.500' mb={2}>{muscleGroupNames[exercise.primaryMuscleGroup]}</Text></HStack>
                    <HStack><Icon as={IoBarbell} /> <Text fontSize='sm' color='gray.500' mb={2}>{exerciseTypeNames[exercise.type]}</Text></HStack>
                  </Flex>
                  <Text fontSize='sm'>{exercise.description}</Text>
                </Box>
              </SimpleGrid>
            </LinkBox>
          ))}
        </Flex>
      </Skeleton>
    </Box>
  )
}
