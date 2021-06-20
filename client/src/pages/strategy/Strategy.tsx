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
import { Display, GameState } from '../../types'
import { Image } from '@chakra-ui/react'
import { useProviders } from '../../hooks/useProviders'
import { Commands, TacticalMap, Units } from './components'
import { InteractiveUnit } from '../../models/InteractiveUnit'

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
