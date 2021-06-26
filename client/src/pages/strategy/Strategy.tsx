import { useParams } from 'react-router-dom'
import React, { useMemo, useEffect, useState } from 'react'
import { BaseLayout } from '../../components/layouts'
import {
  Box,
  Flex,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
} from '@chakra-ui/react'
import { Spinner, Title } from '../../components'
import { GameState, Tick } from '../../types'
import { useProviders } from '../../hooks/useProviders'
import { Commands, TacticalMap, Units } from './components'
import { InteractiveUnit } from '../../models/InteractiveUnit'
import { ReplayableCommand, Vec2 } from '../../models/ReplayableCommand'
import { debounce } from 'lodash'

const COLOURS = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#e100ff',
  '#0bd3f7',
  '#ffa600',
]

export interface IStrategyParams {
  slug: string
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
  const [tick, setTick] = useState<Tick>(0)

  const { slug } = useParams<IStrategyParams>()

  useEffect(() => {
    setLoading(true)

    strategyService
      .getStrategy(slug)
      .then((res) => {
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

  // TODO: Required to calculate starting location for the first command
  const currentSpawn = useMemo(() => {
    return gameState.strategyData?.Map.pointPositions.find(
      (p) =>
        p.fileName ===
        `starting_position_shared_territory-${gameState.spawnpoint}`
    )
  }, [gameState.spawnpoint, gameState.strategyData?.Map.pointPositions])

  function calcPreviousLocation(iteration: number, unitId: number) {
    if (currentSpawn && iteration === 0) {
      return {
        x: currentSpawn.x,
        y: currentSpawn.y,
      }
    }

    const unit = gameState.units.find((u) => u.id === unitId)

    if (!unit) return

    const command = unit.unit.commands[iteration - 1]

    return {
      x: command.targetX,
      y: command.targetY,
    }
  }

  const DELAY = 5
  // TODO: Remove x,y and take in account spawnpoint? + command order
  const replayData = useMemo(() => {
    return gameState.units.flatMap((u, unitIndex) => {
      if (!currentSpawn) return []

      return u.unit.commands.map((c, i) => {
        const prevLocation = calcPreviousLocation(i, u.id)!

        return new ReplayableCommand(
          new Vec2(prevLocation.x, prevLocation.y),
          new Vec2(c.targetX, c.targetY),
          DELAY * (i + unitIndex),
          u.id,
          u.colour
        )
      })
    })
  }, [gameState.units, currentSpawn])

  const currentReplayData = useMemo(() => {
    return replayData.filter((c) => c.tick / 5 < tick)
  }, [tick, replayData])

  const activeUnit = useMemo(
    () => gameState.units.find((u) => u.isActive),
    [gameState.units]
  )

  const allTicks = replayData.flatMap((c) => c.tick)
  const max = allTicks.length > 0 ? Math.max(...allTicks) / 5 + 1 : 0

  if (loading) {
    return <Spinner withMessage />
  }

  function updateLocalUnitColour(id: number, colour: string) {
    setGameState((curr) => ({
      ...curr,
      units: curr.units.map((u) => (u.id === id ? { ...u, colour } : u)),
    }))
  }

  const debouncedUpdateColour = debounce(
    (id: number, colour: string) => updateLocalUnitColour(id, colour),
    75
  )

  async function handleOnAdd(id: number) {
    const unit = gameState.strategyData!.units.find((u) => u.id === id)

    if (!unit) return

    const unitsLength = gameState.units.length

    const strategyUnit = await strategyService.addUnit(
      gameState.strategyData!.id,
      unit,
      COLOURS[unitsLength]
    )

    setGameState((curr) => ({
      ...curr,
      units: [
        ...curr.units,
        new InteractiveUnit({
          id: strategyUnit.id,
          unit: {
            ...unit,
            commands: [],
          },
          colour: COLOURS[unitsLength % COLOURS.length],
        }),
      ],
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
          updateLocalUnitColour={debouncedUpdateColour}
        />
        <Box>
          <TacticalMap
            strategyId={gameState.strategyData!.id}
            mapHeight={gameState.strategyData!.Map.height}
            spawnpoint={gameState.spawnpoint}
            setGameState={setGameState}
            mapUrl={gameState.strategyData!.Map.url}
            pointPositions={gameState.strategyData!.Map.pointPositions}
            activeUnit={activeUnit}
            commands={currentReplayData}
          />
          <Slider
            aria-label="slider-ex-2"
            // colorScheme="pink"
            defaultValue={tick}
            value={tick}
            max={max}
            onChange={(e) => setTick(+e)}
          >
            <SliderTrack backgroundColor="#2B1A21" h={3}>
              <SliderFilledTrack backgroundColor="primary.800" />
            </SliderTrack>
            <SliderThumb backgroundColor="primary.600" />
          </Slider>
        </Box>
        <Commands
          activeUnit={activeUnit}
          removeCommand={async (id) => {
            strategyService.removeCommandFromUnit({ id })

            setGameState((curr) => ({
              ...curr,
              units: curr.units.map((u) => ({
                ...u,
                unit: {
                  ...u.unit,
                  commands: u.unit.commands.filter((c) => c.id !== id),
                },
              })),
            }))
          }}
        />
      </Flex>
    </BaseLayout.Container>
  )
}
