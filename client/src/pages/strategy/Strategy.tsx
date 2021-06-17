import { useParams } from 'react-router-dom'
import React, { useEffect, useRef, useMemo, useState } from 'react'
import { BaseLayout } from '../../components/layouts'
import { useAppDispatch } from '../../store/store'
import { fetchStrategy } from '../../store/slices/strategiesSlice'
import { GameState, UnitEntity } from '@cohdex/tactical-map'
import { Commands, TacticalMapWithRef, Units } from './components'
import { Box, Flex } from '@chakra-ui/react'
import { Spinner, Title } from '../../components'
import { TMap } from '../../logic/tactical-map'
import { useFetch } from '../../hooks'
import { IGetStrategyResponseDto } from '../../../../shared/dist'
import { useProviders } from '../../hooks/useProviders'

export interface IStrategyParams {
  slug: string
}

export const Strategy = () => {
  const init = useRef(true)
  const { strategyService } = useProviders()
  const [gameState, setGameState] = useState<GameState>()
  // const [activeUnitId, setActiveUnitId] = useState<number | null>(null)
  const { slug } = useParams<IStrategyParams>()
  const ref = useRef<HTMLCanvasElement | null>(null)
  const dispatch = useAppDispatch()
  const { loading, data } = useFetch<IGetStrategyResponseDto>(
    () => strategyService.getStrategy(slug),
    undefined!
  )

  useEffect(() => {
    dispatch(fetchStrategy(slug))
  }, [dispatch, slug])

  useEffect(() => {
    async function run() {
      if (ref.current && !loading && init.current) {
        init.current = false
        await TMap.init({
          strategy: data!.strategy,
          rendererOptions: {
            canvas: ref.current!,
            size: 640,
          },
          basePath: process.env.REACT_APP_BASE_URL,
          syncStateHandler: (prop, value, state) => {
            setGameState((curr) => ({
              ...curr,
              ...state,
            }))
          },
        })

        await TMap.start()
      }
    }
    run()
  }, [loading, data, slug])

  // const activeUnit = useMemo(() => {
  //   return gameState?.units.find((unit) => unit.id === activeUnitId)
  // }, [gameState, activeUnitId])

  const activeUnit = useMemo(() => {
    return gameState?.entities.find((e) => {
      if (e instanceof UnitEntity && e.isActive) {
        return e
      }
    }) as UnitEntity | undefined
  }, [gameState])

  console.log(activeUnit)
  // const activeUnit = gameState?.entities.find((e) => {
  //   if (e instanceof UnitEntity) {
  //     return e.isActive
  //   }
  // }) as UnitEntity | undefined

  if (loading) {
    return <Spinner withMessage />
  }

  async function handleOnAdd() {
    if (!gameState) return

    // TODO: Create list to choose unit
    const unit = data.strategy.StrategyUnits[0].unit

    await strategyService.addUnit(data.strategy.id, unit)
  }

  async function handleAddCommand() {}

  function handleSelectUnit(id: number) {
    // console.log(TMap.getGameState().units[0].id)
    TMap.selectUnit(id)
    // setActiveUnitId((curr) => (curr === id ? null : id))
  }

  return (
    <BaseLayout.Container>
      <Box as="header" display="flex" justifyContent="space-between" mb={8}>
        <Title value={data.strategy.title} />
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
          <TacticalMapWithRef
            ref={ref}
            gameState={gameState}
            strategyId={data.strategy.id}
          />
          <Commands activeUnit={activeUnit} />
        </Flex>
      </Flex>
    </BaseLayout.Container>
  )
}
