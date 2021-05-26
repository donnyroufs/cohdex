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
  absolute?: boolean
  opacity?: number | string
}

export const Spinner: React.FC<ISpinnerProps> = ({
  withMessage,
  absolute,
  opacity,
}) => {
  const message =
    loadingMessage[Math.floor(Math.random() * loadingMessage.length)]

  return (
    <Fade in={true}>
      <Box
        zIndex="9000"
        background="background.900"
        position={absolute ? 'absolute' : 'fixed'}
        top={0}
        left={0}
        h={absolute ? '100%' : '100vh'}
        w="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        opacity={opacity ? opacity : 1}
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
