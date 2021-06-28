import { Flex } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/button'
import { BsCircle } from 'react-icons/bs'
import { BiRectangle } from 'react-icons/bi'
import { Display } from '../../../../types'

export interface ISwitchDisplayProps {
  display: Display
  handleChangeDisplay: () => void
}

export const SwitchDisplay: React.FC<ISwitchDisplayProps> = ({
  handleChangeDisplay,
  display,
}) => {
  return (
    <Flex onClick={handleChangeDisplay}>
      <IconButton
        icon={<BsCircle />}
        aria-label="switch tactical map display to a circle"
        backgroundColor={
          display === 'circle' ? 'primary.600' : 'background.800'
        }
        display="flex"
        justifyContent="center"
        alignItems="center"
        color={display === 'circle' ? 'white' : 'text.600'}
        borderRadius="none"
        variant="unstyled"
        border="none"
        _focus={{
          outline: 'none',
        }}
      />
      <IconButton
        icon={<BiRectangle />}
        aria-label="switch tactical map display to a rectangle"
        backgroundColor={
          display === 'rectangle' ? 'primary.600' : 'background.800'
        }
        color={display === 'rectangle' ? 'white' : 'text.600'}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="none"
        variant="unstyled"
        border="none"
        _focus={{
          outline: 'none',
        }}
      />
    </Flex>
  )
}
