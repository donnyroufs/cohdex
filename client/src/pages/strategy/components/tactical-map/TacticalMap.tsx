import { Box, Button, Image } from '@chakra-ui/react'
import { IPointPosition } from '@cohdex/shared'
import { useState } from 'react'
import { useProviders } from '../../../../hooks/useProviders'
import { InteractiveUnit } from '../../../../models/InteractiveUnit'
import { ReplayableCommand } from '../../../../models/ReplayableCommand'
import { Display, GameState } from '../../../../types'
import { replaceTgaWithPng } from '../../../../utils'
import { PointPosition } from './PointPosition'
import { SwitchDisplay } from './SwitchDisplay'

export interface ITacticalMapProps {
  strategyId: number
  spawnpoint: number | null
  mapHeight: number
  mapUrl: string
  pointPositions: IPointPosition[]
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  activeUnit?: InteractiveUnit
  commands: ReplayableCommand[]
}

export const TacticalMap: React.FC<ITacticalMapProps> = ({
  strategyId,
  spawnpoint,
  mapHeight,
  mapUrl,
  pointPositions,
  setGameState,
  activeUnit,
  commands,
}) => {
  const { strategyService } = useProviders()
  const scale = 700 / mapHeight

  const [display, setDisplay] = useState<Display>('circle')

  function handleChangeDisplay() {
    setDisplay((curr) => (curr === 'circle' ? 'rectangle' : 'circle'))
  }

  async function handleChooseSpawnpoint(spawn: number) {
    await strategyService.chooseSpawnpoint(strategyId, spawn)
    setGameState((curr) => ({
      ...curr,
      spawnpoint: spawn,
    }))
  }

  function onClickPointPosition(point: IPointPosition) {
    if (!activeUnit) return

    console.log(`clicked point: ${point.fileName}`)
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
        <Box position="relative">
          <Image
            src={replaceTgaWithPng(mapUrl)}
            alt="tactical map"
            borderRadius={display === 'circle' ? '100%' : 0}
            minH={700}
            h={700}
            minW={700}
            w={700}
          />
          {pointPositions.map((p) => (
            <PointPosition
              point={p}
              scale={scale}
              onClickPointPosition={onClickPointPosition}
            />
          ))}
          {commands.map((c) => (
            <Box
              pos="absolute"
              top={c.target.y}
              left={c.target.x}
              color="cyan"
              fontSize="1.5rem"
            >
              {c.unitId}
            </Box>
          ))}
        </Box>
        {!spawnpoint && (
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
