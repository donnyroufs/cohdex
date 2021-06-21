import { Box, Button, Image } from '@chakra-ui/react'
import { IAddCommandToStrategyUnitDto, ICommand } from '@cohdex/shared'
import { IPointPosition } from '@cohdex/shared'
import { useState } from 'react'
import { useProviders } from '../../../../hooks/useProviders'
import { InteractiveUnit } from '../../../../models/InteractiveUnit'
import { ReplayableCommand, Vec2 } from '../../../../models/ReplayableCommand'
import { Display, GameState } from '../../../../types'
import { replaceTgaWithPng } from '../../../../utils'
import { PointPosition } from './PointPosition'
import { SwitchDisplay } from './SwitchDisplay'

function posToScreen(pos: Vec2, scale: number) {
  return new Vec2(350 - pos.x * scale - 16, 350 - pos.y * scale - 16)
}

function singleCoordinateToScreen(coordinate: number, scale: number) {
  return 350 - coordinate * scale
}
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

export interface ILineProps {
  x1: number
  y1: number
  x2: number
  y2: number
  scale: number
}

export const Line: React.FC<ILineProps> = ({ x1, x2, y1, y2, scale }) => {
  console.log({ x1, x2, y1, y2 })
  // console.log({
  //   x1: singleCoordinateToScreen(x1, scale),
  //   x2,
  //   y1: singleCoordinateToScreen(y1, scale),
  //   y2,
  // })
  return (
    <line
      // x1={0}
      // y1={0}
      // x2={100}
      // y2={100}
      x1={singleCoordinateToScreen(-x1, scale)}
      y1={singleCoordinateToScreen(y1, scale)}
      x2={singleCoordinateToScreen(-x2, scale)}
      y2={singleCoordinateToScreen(y2, scale)}
      style={{
        stroke: 'rgb(255,0,0)',
        strokeWidth: 2,
      }}
    />
  )
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

  async function onClickPointPosition(point: IPointPosition) {
    if (!activeUnit) return

    const obj: IAddCommandToStrategyUnitDto = {
      description: '',
      targetX: point.x,
      targetY: point.y,
      strategyUnitsId: activeUnit.id,
      type: 'CAPTURE',
    }

    await strategyService.addCommandToUnit(obj)

    const res: ICommand = {
      description: '',
      targetX: point.x,
      targetY: point.y,
      strategyUnitsId: activeUnit.id,
      type: 'CAPTURE',
      id: Math.random() * 2031,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1,
    }

    setGameState((curr) => ({
      ...curr,
      units: curr.units.map((u) => {
        if (u.id === activeUnit.id) {
          return {
            ...u,
            unit: {
              ...u.unit,
              commands: [...u.unit.commands, res],
            },
          }
        }
        return u
      }),
    }))
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
          <svg
            height="700"
            width="700"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {commands.map((c) => (
              <Line
                x1={c.pos.x}
                x2={c.target.x}
                y1={c.pos.y}
                y2={c.target.y}
                scale={scale}
              />
            ))}
          </svg>
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
              top={singleCoordinateToScreen(c.target.y, scale)}
              right={singleCoordinateToScreen(c.target.x, scale)}
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
