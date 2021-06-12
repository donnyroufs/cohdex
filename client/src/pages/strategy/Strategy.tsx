import { useParams } from 'react-router-dom'
import React, { useEffect, useRef, useMemo, useState } from 'react'
import { BaseLayout } from '../../components/layouts'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { fetchStrategy } from '../../store/slices/strategiesSlice'
import { GameState } from '@cohdex/tactical-map'
import { Commands, TacticalMapWithRef, Units } from './components'
import { Box, Flex } from '@chakra-ui/react'
import { Spinner, Title } from '../../components'
import { TMap } from '../../logic/tactical-map'
import { addUnitToStrategy, restore } from '../../store/slices/strategySlice'

export interface IStrategyParams {
  slug: string
}

export const Strategy = () => {
  const init = useRef(true)
  const [gameState, setGameState] = useState<GameState>()
  const [activeUnitId, setActiveUnitId] = useState<number | null>(null)
  const { slug } = useParams<IStrategyParams>()
  const ref = useRef<HTMLCanvasElement | null>(null)
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.strategy.status)
  const strategy = useAppSelector((state) => state.strategy.data)

  useEffect(() => {
    dispatch(fetchStrategy(slug))
  }, [dispatch, slug])

  useEffect(() => {
    if (ref.current && status === 'idle' && init.current) {
      init.current = false
      TMap.init({
        strategy,
        rendererOptions: {
          canvas: ref.current!,
          size: 640,
        },
        basePath: process.env.REACT_APP_BASE_URL,
        syncStateHandler: (prop, value, state) => {
          console.log('updating gameState')
          setGameState((curr) => ({
            ...curr,
            ...state,
          }))
        },
      })

      TMap.start()
    }
  }, [status, strategy, slug])

  useEffect(() => {
    return () => {
      console.log('restoring')
      dispatch(restore())
      TMap.clearState()
    }
  }, [dispatch])

  const activeUnit = useMemo(() => {
    return gameState?.units.find((unit) => unit.id === activeUnitId)
  }, [gameState, activeUnitId])

  if (status === 'init') {
    return <Spinner withMessage />
  }

  async function handleOnAdd() {
    if (!gameState) return

    // TODO: Create list to choose unit
    const unit = strategy.StrategyUnits[0].unit

    const res = await dispatch(
      addUnitToStrategy({
        strategyId: strategy.id,
        unitId: unit.id,
      })
    )

    TMap.addUnit({
      // @ts-expect-error not sure how to type dispatch
      id: res.payload.data.strategyUnit.id,
      unit,
    })
  }

  function handleSelectUnit(id: number) {
    setActiveUnitId((curr) => (curr === id ? null : id))
  }

  return (
    <BaseLayout.Container>
      <Box as="header" display="flex" justifyContent="space-between" mb={8}>
        <Title value={strategy.title} />
        <Title value="Commands" />
      </Box>
      <Flex flexDir="row">
        <Units
          handleOnAdd={handleOnAdd}
          gameState={gameState}
          handleSelectUnit={handleSelectUnit}
          activeUnit={activeUnit}
        />
        <Flex flexDir="row" flexWrap="wrap" flex={1}>
          <TacticalMapWithRef ref={ref} gameState={gameState} />
          <Commands activeUnit={activeUnit} />
        </Flex>
      </Flex>
    </BaseLayout.Container>
  )
}
