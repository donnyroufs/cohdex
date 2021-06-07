import { useParams } from 'react-router-dom'
import React, { useEffect, useRef } from 'react'
import { BaseLayout } from '../../components/layouts'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { fetchStrategy } from '../../store/slices/strategiesSlice'
import {
  TacticalMap,
  TacticalMap as TMap,
  GameState,
} from '@cohdex/tactical-map'
import { Commands, TacticalMapWithRef, Units } from './components'
import { Box, Flex } from '@chakra-ui/react'
import { Spinner, Title } from '../../components'

export interface IStrategyParams {
  slug: string
}

export const Strategy = () => {
  const [gameState, setGameState] = React.useState<GameState>()
  const { slug } = useParams<IStrategyParams>()
  const ref = useRef<HTMLCanvasElement | null>(null)
  const tmap = useRef<TacticalMap>()
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.strategy.status)
  const strategy = useAppSelector((state) => state.strategy.data)

  console.count('rendered')

  useEffect(() => {
    dispatch(fetchStrategy(slug))
  }, [dispatch, slug])

  useEffect(() => {
    if (ref.current && status === 'idle') {
      tmap.current = new TMap({
        strategy,
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

      tmap.current.start()
    }
  }, [status, strategy, slug])

  if (status === 'init') {
    return <Spinner withMessage />
  }

  function handleOnAdd() {
    // console.log({
    //   reactState: gameState,
    //   tmapState: tmap.current?.getGameState(),
    // })
    tmap.current?.addUnit({})
  }

  return (
    <BaseLayout.Container>
      <Box as="header" display="flex" justifyContent="space-between" mb={8}>
        <Title value={strategy.title} />
        <Title value="Commands" />
        {JSON.stringify(gameState)}
      </Box>
      <Flex flexDir="row">
        <Units handleOnAdd={handleOnAdd} />
        <Flex flexDir="row" flexWrap="wrap" flex={1}>
          <TacticalMapWithRef ref={ref} />
          <Commands />
        </Flex>
      </Flex>
    </BaseLayout.Container>
  )
}
