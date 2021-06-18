import { useParams } from 'react-router-dom'
import React, { useEffect, useRef, useMemo, useState } from 'react'
import { BaseLayout } from '../../components/layouts'
import { useAppDispatch } from '../../store/store'
import { fetchStrategy } from '../../store/slices/strategiesSlice'
import { GameState, UnitEntity } from '@cohdex/tactical-map'
import { Commands, TacticalMapWithRef, Units } from './components'
import { Box, Flex, Skeleton } from '@chakra-ui/react'
import { Spinner, Title } from '../../components'
import { TMap } from '../../logic/tactical-map'
import { useFetch } from '../../hooks'
import {
  IGetStrategyResponseDto,
  IPointPosition,
  IStrategy,
} from '@cohdex/shared'
import { Image } from '@chakra-ui/react'
import { useProviders } from '../../hooks/useProviders'

export interface IStrategyParams {
  slug: string
}
function flipY(pos: number) {
  return pos < 0 ? Math.abs(pos) : 0 - pos
}

function replaceTgaWithPng(url: string) {
  return url.replace('tga', 'png')
}

export const PointPosition: React.FC<IPointPosition & { scale: number }> = (
  point
) => {
  const imageUrl =
    process.env.REACT_APP_BASE_URL + '/public/' + point.fileName + '.png'

  const x = 350 - point.x * point.scale - 16
  const y = 350 - point.y * point.scale - 16

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
    />
  )
}

export const TacticalMap: React.FC<{ strategy: IStrategy }> = ({
  strategy,
}) => {
  const scale = 700 / strategy.Map.height

  return (
    <Box position="relative">
      <Image
        src={replaceTgaWithPng(strategy.Map.url)}
        alt="tactical map"
        minH={700}
        h={700}
        minW={700}
        w={700}
      />
      {/* <Image src={strategy.Map.url} alt="tactical map" /> */}
      {strategy.Map.pointPositions.map((p) => (
        <PointPosition {...p} scale={scale} />
      ))}
    </Box>
  )
}

export const Strategy = () => {
  const { strategyService } = useProviders()
  const { slug } = useParams<IStrategyParams>()
  const { loading, data } = useFetch<IGetStrategyResponseDto>(
    () => strategyService.getStrategy(slug),
    undefined!
  )

  if (loading) {
    return <Spinner withMessage />
  }

  console.log(data)

  return (
    <BaseLayout.Container>
      <Box as="header" display="flex" justifyContent="space-between" mb={8}>
        <Title value={data.strategy.title} />
        <Title value="Commands" />
      </Box>
      <Flex flexDir="row">
        <TacticalMap strategy={data.strategy} />
        {/* <Units
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
        </Flex> */}
      </Flex>
    </BaseLayout.Container>
  )
}
