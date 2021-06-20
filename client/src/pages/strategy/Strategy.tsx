import { useParams } from 'react-router-dom'
import React, { useMemo, useEffect, useState } from 'react'
import { BaseLayout } from '../../components/layouts'
import { Box, Button, Flex } from '@chakra-ui/react'
import { Spinner, Title } from '../../components'
import {
  IPointPosition,
  IStrategy,
  IStrategyUnit,
  IUnitWithCommands,
} from '@cohdex/shared'
import { Display } from '../../types'
import { Image } from '@chakra-ui/react'
import { useProviders } from '../../hooks/useProviders'
import { SwitchDisplay } from './components/tactical-map/SwitchDisplay'
import { Commands, Units } from './components'

export interface IStrategyParams {
  slug: string
}

function replaceTgaWithPng(url: string) {
  return url.replace('tga', 'png')
}

export interface IPointPositionProps {
  point: IPointPosition
  scale: number
  onClickPointPosition(point: IPointPosition): void
}

export const PointPosition: React.FC<IPointPositionProps> = ({
  point,
  onClickPointPosition,
  scale,
}) => {
  const imageUrl =
    process.env.REACT_APP_BASE_URL + '/public/' + point.fileName + '.png'

  const x = 350 - point.x * scale - 16
  const y = 350 - point.y * scale - 16

  return (
    <Image
      src={imageUrl}
      alt={point.fileName}
      position="absolute"
      top={y}
      right={x}
      h="32px"
      w="32px"
      onMouseOver={() => {
        document.body.style.cursor = 'pointer'
      }}
      onMouseOut={() => {
        document.body.style.cursor = 'default'
      }}
      onClick={() => onClickPointPosition(point)}
    />
  )
}

export const TacticalMap: React.FC<{
  strategyId: number
  spawnpoint: number | null
  mapHeight: number
  mapUrl: string
  pointPositions: IPointPosition[]
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  activeUnit?: InteractiveUnit
}> = ({
  strategyId,
  spawnpoint,
  mapHeight,
  mapUrl,
  pointPositions,
  setGameState,
  activeUnit,
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

export class InteractiveUnit implements IStrategyUnit {
  id: number
  unit: IUnitWithCommands
  isActive: boolean

  constructor(props: IStrategyUnit) {
    this.id = props.id
    this.unit = props.unit
    this.isActive = false
  }
}

export type GameState = {
  units: InteractiveUnit[]
  spawnpoint: null | number
  strategyData: IStrategy | null
}

export const Strategy = () => {
  const { strategyService } = useProviders()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [gameState, setGameState] = useState<GameState>({
    units: [],
    spawnpoint: null,
    strategyData: null,
  })

  const { slug } = useParams<IStrategyParams>()

  useEffect(() => {
    setLoading(true)

    strategyService
      .getStrategy(slug)
      .then((res) => {
        console.log(res.data)
        // TODO: add units
        setGameState({
          units: res.data.strategy.StrategyUnits.map(
            (props) => new InteractiveUnit(props)
          ),
          spawnpoint: res.data.strategy.spawnPoint,
          strategyData: res.data.strategy,
        })
      })
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false)
      })
  }, [strategyService, slug])

  const activeUnit = useMemo(
    () => gameState.units.find((u) => u.isActive),
    [gameState.units]
  )

  if (loading) {
    return <Spinner withMessage />
  }

  // TODO: Make interactive menu to choose available units
  async function handleOnAdd() {
    if (!gameState.strategyData) return

    const { unit } = gameState.strategyData.StrategyUnits[0]
    const strategyUnit = await strategyService.addUnit(
      gameState.strategyData.id,
      unit
    )

    setGameState((curr) => ({
      ...curr,
      units: [...curr.units, new InteractiveUnit(strategyUnit)],
    }))
  }

  function handleSelectUnit(id: number) {
    setGameState((curr) => ({
      ...curr,
      units: curr.units.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            isActive: !u.isActive,
          }
        }

        return {
          ...u,
          isActive: false,
        }
      }),
    }))
  }

  return (
    <BaseLayout.Container>
      <Box as="header" display="flex" justifyContent="space-between" mb={8}>
        <Title value={gameState.strategyData!.title} />
        <Title value="Commands" />
      </Box>
      <Flex flexDir="row">
        <Units
          handleOnAdd={handleOnAdd}
          gameState={gameState}
          handleSelectUnit={handleSelectUnit}
          activeUnit={activeUnit}
        />
        <TacticalMap
          strategyId={gameState.strategyData!.id}
          mapHeight={gameState.strategyData!.Map.height}
          spawnpoint={gameState.spawnpoint}
          setGameState={setGameState}
          mapUrl={gameState.strategyData!.Map.url}
          pointPositions={gameState.strategyData!.Map.pointPositions}
          activeUnit={activeUnit}
        />
        <Commands activeUnit={activeUnit} />
      </Flex>
    </BaseLayout.Container>
  )
}
