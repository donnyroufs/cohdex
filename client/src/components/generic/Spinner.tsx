import { Box, Spinner as ChakraSpinner, Text, Fade } from '@chakra-ui/react'

const loadingMessage = [
  'Setting up my hmg',
  'Warning the germans',
  'Daddy is coming',
  'My sniper just died by a mortar',
  'Making war not love',
  'Taking the wrong path to base',
  'Remaking lost conscripts',
  'Clowncar is on its way',
  'I lost everything',
  'You did the sjors',
]

export interface ISpinnerProps {
  withMessage: boolean
}

export const Spinner: React.FC<ISpinnerProps> = ({ withMessage }) => {
  const message =
    loadingMessage[Math.floor(Math.random() * loadingMessage.length)]

  return (
    <Fade in={true}>
      <Box
        background="background.900"
        position="fixed"
        top={0}
        left={0}
        h="100vh"
        w="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ChakraSpinner size="xl" color="primary.600" />
        {withMessage && (
          <Text ml={8} fontSize="lg">
            {message}...
          </Text>
        )}
      </Box>
    </Fade>
  )
}
