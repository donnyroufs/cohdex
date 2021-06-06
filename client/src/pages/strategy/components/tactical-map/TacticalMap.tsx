import React, { useState } from 'react'
import { Display } from '../../../../types'
import { SwitchDisplay } from './SwitchDisplay'
import { Box } from '@chakra-ui/layout'

export interface ITacticalMapProps {
  tmapRef: React.ForwardedRef<HTMLCanvasElement | null>
}

const TacticalMap: React.FC<ITacticalMapProps> = ({ tmapRef }) => {
  const [display, setDisplay] = useState<Display>('circle')
  function handleChangeDisplay() {
    setDisplay((curr) => (curr === 'circle' ? 'rectangle' : 'circle'))
  }
  return (
    <Box
      backgroundColor="header"
      h="840px"
      w="1000px"
      border="1px solid"
      borderRadius={4}
      borderColor="border"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      p={8}
      mr={8}
    >
      <Box
        as="header"
        flex={1}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-start"
        w="100%"
      >
        <SwitchDisplay
          display={display}
          handleChangeDisplay={handleChangeDisplay}
        />
      </Box>
      <canvas
        ref={tmapRef}
        style={{
          borderRadius: `${display === 'circle' ? '100%' : '0%'}`,
          border: '6px solid #2D333A',
        }}
      ></canvas>
      <Box as="footer" flex={1}></Box>
    </Box>
  )
}

export const TacticalMapWithRef = React.forwardRef(
  (props, ref: React.ForwardedRef<HTMLCanvasElement | null>) => (
    <TacticalMap {...props} tmapRef={ref} />
  )
)
