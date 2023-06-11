import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, FormControl, FormLabel, Input, Textarea, Select, Image, Center, Icon, Stack, Text } from '@chakra-ui/react'
import { FaCamera } from 'react-icons/fa'
import { useDropzone } from 'react-dropzone'
import * as yup from 'yup'
import { useState } from 'react'
import { MuscleGroups, ExerciseType } from '../../types.d'

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required(),
  primaryMuscle: yup.string().required(),
  secondaryMuscle: yup.string().optional(),
  type: yup.string().required(),
  description: yup.string().optional()
})

const muscleGroupNames: Record<MuscleGroups, string> = {
  [MuscleGroups.ABDOMINALS]: 'Abdominales',
  [MuscleGroups.ABDUCTORS]: 'Abductores',
  [MuscleGroups.BICEPS]: 'Bíceps',
  [MuscleGroups.CALVES]: 'Gemelos',
  [MuscleGroups.CARDIO]: 'Cardio',
  [MuscleGroups.CHEST]: 'Pecho',
  [MuscleGroups.FOREARMS]: 'Antebrazos',
  [MuscleGroups.FULL_BODY]: 'Cuerpo Completo',
  [MuscleGroups.GLUTES]: 'Glúteos',
  [MuscleGroups.HAMSTRINGS]: 'Isquiotibiales',
  [MuscleGroups.LATS]: 'Dorsales',
  [MuscleGroups.LOWER_BACK]: 'Espalda Baja',
  [MuscleGroups.QUADRICEPS]: 'Cuádriceps',
  [MuscleGroups.SHOULDERS]: 'Hombros',
  [MuscleGroups.TRAPS]: 'Trapecios',
  [MuscleGroups.TRICEPS]: 'Tríceps',
  [MuscleGroups.UPPER_BACK]: 'Espalda Alta',
  [MuscleGroups.OTHER]: 'Otro'
}

const exerciseTypeNames: Record<ExerciseType, string> = {
  [ExerciseType.WEIGHT]: 'Peso',
  [ExerciseType.REPS]: 'Repeticiones',
  [ExerciseType.TIME]: 'Tiempo',
  [ExerciseType.DISTANCE]: 'Distancia',
  [ExerciseType.WEIGHT_REPS]: 'Peso y Repeticiones',
  [ExerciseType.TIME_DISTANCE]: 'Tiempo y Distancia'
}

export default function Exercise () {
  const [file, setFile] = useState<string | undefined>()
  const onDrop = (acceptedFiles: Array<Blob | MediaSource>) => setFile(URL.createObjectURL(acceptedFiles[0]))
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Center>
          <Center
            {...getRootProps()}
            border='2px dashed'
            borderRadius='50%'
            width={150}
            height={150}
            color='gray.400'
            position='relative'
            cursor='pointer'
          >
            <input {...getInputProps()} accept='image/*' />
            {file
              ? <Image
                  borderRadius='50%'
                  src={file}
                  boxSize='150px'
                  objectFit='cover'
                />
              : <Icon as={FaCamera} boxSize={10} />}
          </Center>
        </Center>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nombre del ejercicio <Text as='b' color='red.400'>*</Text></FormLabel>
          <Input {...register('name')} />
        </FormControl>

        <FormControl isInvalid={!!errors.primaryMuscle}>
          <FormLabel>Grupo muscular primario <Text as='b' color='red.400'>*</Text></FormLabel>
          <Controller
            name='primaryMuscle'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Select {...field}>
                <option value='' disabled>Selecciona un grupo muscular</option>
                {Object.entries(muscleGroupNames).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.secondaryMuscle}>
          <FormLabel>Grupo muscular secundario</FormLabel>
          <Controller
            name='secondaryMuscle'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Select {...field}>
                <option value='' disabled>Selecciona un grupo muscular</option>
                {Object.entries(muscleGroupNames).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.type}>
          <FormLabel>Tipo de ejercicio <Text as='b' color='red.400'>*</Text></FormLabel>
          <Controller
            name='type'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Select {...field}>
                <option value='' disabled>Selecciona un tipo de ejercicio</option>
                {Object.entries(exerciseTypeNames).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel>Descripción</FormLabel>
          <Textarea {...register('description')} />
        </FormControl>

        <Button type='submit' colorScheme='blue'>
          Guardar ejercicio
        </Button>

      </Stack>
    </form>
  )
}
