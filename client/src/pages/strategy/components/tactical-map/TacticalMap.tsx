import React, { useState } from 'react'
import { Display } from '../../../../types'
import { SwitchDisplay } from './SwitchDisplay'
import { Box, Button, Skeleton } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { chooseSpawnpoint } from '../../../../store/slices/strategySlice'
import { TMap } from '../../../../logic/tactical-map'
import { Spinner } from '../../../../components'
import { GameState } from '../../../../../../tactical-map/dist'

export interface ITacticalMapProps {
  tmapRef: React.ForwardedRef<HTMLCanvasElement | null>
  gameState?: GameState
}

const TacticalMap: React.FC<ITacticalMapProps> = ({ tmapRef, gameState }) => {
  const [display, setDisplay] = useState<Display>('circle')
  const dispatch = useAppDispatch()
  const strategyId = useAppSelector((state) => state.strategy.data.id)

  function handleChangeDisplay() {
    setDisplay((curr) => (curr === 'circle' ? 'rectangle' : 'circle'))
  }

  async function handleChooseSpawnpoint(spawn: number) {
    // We assume that this will never fail.
    await dispatch(
      chooseSpawnpoint({
        strategyId,
        spawnpoint: spawn,
      })
    )

    TMap.setSpawnpoint(spawn)
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
      <Box position="relative">
        <canvas
          ref={tmapRef}
          style={{
            borderRadius: `${display === 'circle' ? '100%' : '0%'}`,
            border: '6px solid #2D333A',
          }}
        ></canvas>
        {!gameState?.spawnpoint && (
          <Box
            position="absolute"
            top="0"
            color="white"
            fontSize="4xl"
            zIndex="10"
            h="100%"
            w="100%"
            background="rgb(22, 31, 40, .75)"
            borderRadius={display === 'circle' ? '100%' : '0%'}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              w={16}
              h={16}
              display="flex"
              justifyContent="center"
              alignItems="center"
              mr={4}
              background="background.700"
              borderRadius="100%"
              variant="unstyled"
              fontSize="2xl"
              _hover={{
                background: 'primary.600',
                cursor: 'pointer',
                transition: '.15s all ease-in-out',
              }}
              onClick={() => handleChooseSpawnpoint(1)}
            >
              1
            </Button>
            <Button
              w={16}
              h={16}
              fontSize="2xl"
              display="flex"
              justifyContent="center"
              variant="unstyled"
              alignItems="center"
              background="background.700"
              borderRadius="100%"
              _hover={{
                background: 'primary.600',
                cursor: 'pointer',
                transition: '.15s all ease-in-out',
              }}
              onClick={() => handleChooseSpawnpoint(2)}
            >
              2
            </Button>
          </Box>
        )}
      </Box>
      <Box as="footer" flex={1}></Box>
    </Box>
  )
}

export const TacticalMapWithRef = React.forwardRef<
  any,
  { gameState?: GameState }
>((props, ref: React.ForwardedRef<HTMLCanvasElement | null>) => (
  <TacticalMap {...props} tmapRef={ref} />
))
