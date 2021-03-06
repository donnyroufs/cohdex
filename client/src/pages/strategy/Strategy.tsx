import { useHistory, useParams } from 'react-router-dom'
import React, { useMemo, useEffect, useState } from 'react'
import { BaseLayout } from '../../components/layouts'
import {
  Text,
  Box,
  Flex,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  IconButton,
} from '@chakra-ui/react'
import { Spinner, Title } from '../../components'
import { GameState, Tick } from '../../types'
import { useProviders } from '../../hooks/useProviders'
import { Commands, TacticalMap, Units } from './components'
import { InteractiveUnit } from '../../models/InteractiveUnit'
import { ReplayableCommand, Vec2 } from '../../models/ReplayableCommand'
import { debounce } from 'lodash'
import useWindowSize from '../../hooks/useWindowSize'
import { LockIcon, UnlockIcon } from '@chakra-ui/icons'
import { Visibility } from '@cohdex/shared'
import { useAppSelector } from '../../store/store'

const COLOURS = [
  '#EF1080',
  '#97D5B0',
  '#C9CADA',
  '#116AF0',
  '#ffa600',
  '#E5FF16',
]

export interface IStrategyParams {
  id: string
  slug: string
}

export const Strategy = () => {
  const history = useHistory()
  const { strategyService } = useProviders()
  const { width } = useWindowSize()
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = React.useState(true)
  const user = useAppSelector((state) => state.auth.user)
  // const [error, setError] = React.useState(null)
  const [gameState, setGameState] = useState<GameState>({
    units: [],
    spawnpoint: null,
    strategyData: null,
  })
  const [tick, setTick] = useState<Tick>(0)

  const { id, slug } = useParams<IStrategyParams>()

  useEffect(() => {
    setLoading(true)

    strategyService
      .getStrategy({ id: +id, slug })
      .then((res) => {
        setGameState({
          units: res.data.strategy.StrategyUnits.map(
            (props) => new InteractiveUnit(props)
          ),
          spawnpoint: res.data.strategy.spawnPoint,
          strategyData: res.data.strategy,
        })
      })
      .catch((err) => {
        // TODO: Handle error
        history.push('/strategies')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [strategyService, slug, id, history])

  // TODO: Required to calculate starting location for the first command
  const currentSpawn = useMemo(() => {
    return gameState.strategyData?.Map.pointPositions.find(
      (p) =>
        p.fileName ===
        `starting_position_shared_territory-${gameState.spawnpoint}`
    )
  }, [gameState.spawnpoint, gameState.strategyData?.Map.pointPositions])

  useEffect(() => {
    const renderAllCommands = 1337
    setTick(renderAllCommands)
  }, [])

  useEffect(() => {
    let id: NodeJS.Timeout

    // new command has been added
    if (playing && tick > max) {
      setTick(0)
    }

    if (playing && tick !== max) {
      id = setInterval(() => setTick((curr) => curr + 1), 800)
    }

    if (playing && tick === max) {
      setPlaying(false)
    }

    return () => {
      clearInterval(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, tick])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.units, currentSpawn])

  const currentReplayData = useMemo(() => {
    return replayData.filter((c) => c.tick / 5 < tick)
  }, [tick, replayData])

  const activeUnit = useMemo(
    () => gameState.units.find((u) => u.isActive),
    [gameState.units]
  )

  const allTicks = replayData.flatMap((c) => c.tick)
  // NOTE: The +1 will cause issues the longer the replay is.
  // It will add an empty step, might need to check if last one has commands
  const max = allTicks.length > 0 ? Math.max(...allTicks) / 5 + 1 : 0

  const isOwner = useMemo(() => {
    return user?.id === gameState.strategyData?.userId
  }, [user, gameState])

  useEffect(() => {
    if (!gameState || !gameState.strategyData) return

    if (!isOwner && gameState.strategyData.visibility === Visibility.PRIVATE) {
      history.push('/strategies')
    }
  }, [loading, gameState, isOwner, history])

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
    if (!isOwner) return
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

  function removeLocalUnit(id: number) {
    if (!isOwner) return
    setGameState((curr) => ({
      ...curr,
      units: curr.units.filter((u) => u.id !== id),
    }))
  }

  function handlePlay() {
    if (playing) {
      setPlaying(false)
      return
    }

    if (!playing && tick === max) {
      setTick(0)
      setPlaying(true)
      return
    }

    setPlaying((curr) => !curr)
  }

  async function handleChangeVisibility(visibility: Visibility) {
    if (!isOwner) return

    await strategyService.updateStrategyVisibility({
      visibility,
      strategyId: +id,
    })

    setGameState((curr) => ({
      ...curr,
      strategyData: {
        ...curr.strategyData!,
        visibility,
      },
    }))
  }

  if (width <= 1140) {
    return (
      <Box
        bgColor="table"
        p={6}
        border="1px solid"
        borderColor="primary.700"
        mt={20}
      >
        <Text color="vintage.500">
          Sorry but we do not support this resolution.
        </Text>
      </Box>
    )
  }

  return (
    <BaseLayout.Container>
      <Flex flexDir="row">
        <Flex flexDir="row" flexWrap="wrap" flex="1" justifyContent="center">
          <Flex flexDir="row">
            <Units
              isOwner={isOwner}
              handleOnAdd={handleOnAdd}
              gameState={gameState}
              handleSelectUnit={handleSelectUnit}
              activeUnit={activeUnit}
              updateLocalUnitColour={debouncedUpdateColour}
              removeLocalUnit={removeLocalUnit}
            />
            <Box>
              <Flex justifyContent="space-between">
                <Title value={gameState.strategyData!.title} mt={0} mb={6} />
                {gameState.strategyData?.visibility === Visibility.PRIVATE &&
                  isOwner && (
                    <Box display="flex" alignItems="center" mb={4}>
                      <Text mr={4}>Currently not sharing</Text>
                      <IconButton
                        aria-label="set visibility to public"
                        background="background.800"
                        color="vintage.600"
                        variant="unstyled"
                        icon={<LockIcon mb={1} />}
                        onClick={() =>
                          handleChangeVisibility(Visibility.PUBLIC)
                        }
                      />
                    </Box>
                  )}
                {gameState.strategyData?.visibility === Visibility.PUBLIC &&
                  isOwner && (
                    <Box display="flex" alignItems="center" mb={4}>
                      <Text mr={4}>Shared with others</Text>
                      <IconButton
                        aria-label="set visibility to private"
                        variant="unstyled"
                        color="vintage.600"
                        icon={<UnlockIcon mb={1} />}
                        background="background.800"
                        onClick={() =>
                          handleChangeVisibility(Visibility.PRIVATE)
                        }
                      />
                    </Box>
                  )}
                {!isOwner && (
                  <Text>
                    strategy by{' '}
                    <Box as="b" color="primary.600">
                      {gameState.strategyData?.User.displayName}
                    </Box>
                  </Text>
                )}
              </Flex>
              <TacticalMap
                isOwner={isOwner}
                strategyId={gameState.strategyData!.id}
                mapHeight={gameState.strategyData!.Map.height}
                spawnpoint={gameState.spawnpoint}
                setGameState={setGameState}
                mapUrl={gameState.strategyData!.Map.url}
                pointPositions={gameState.strategyData!.Map.pointPositions}
                activeUnit={activeUnit}
                commands={currentReplayData}
                handlePlay={handlePlay}
                playing={playing}
                setTick={setTick}
                max={max}
              />
              <Slider
                aria-label="slider-ex-2"
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
          </Flex>
          <Flex flexDir="column" flex="1" ml={{ lg: 0, xl: 16 }}>
            <Title
              value="Commands"
              mt={0}
              mb={6}
              ml={{ xl: 'auto' }}
              className="commands"
            />
            <Commands
              isOwner={isOwner}
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
        </Flex>
      </Flex>
    </BaseLayout.Container>
  )
}
