import React, { useEffect, useState } from 'react'
import { Spinner, Title } from '../../components'
import { BaseLayout } from '../../components/layouts'
import {
  fetchCreateStrategy,
  fetchFactions,
  fetchMaps,
} from '../../store/slices/strategiesSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import {
  ChooseAlliesFaction,
  ChooseMap,
  CreateModal,
  Footer,
  StrategyTitle,
} from './components'
import { Container } from '@chakra-ui/layout'
import { useDisclosure } from '@chakra-ui/react'
import { ChooseAxisFaction } from './components'
import { IStrategiesLocalState } from '../../types'

export const CreateStrategy = () => {
  const [state, setState] = useState<IStrategiesLocalState>({})
  const isLoading = useAppSelector((state) => state.strategies.isLoading)
  const dispatch = useAppDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    dispatch(fetchFactions())
    dispatch(fetchMaps())
  }, [dispatch])

  useEffect(() => {
    if (Object.keys(state).length < 5) return

    if (Object.values(state).every((v) => v)) {
      dispatch(
        fetchCreateStrategy({
          alliesFactionId: +state.alliesFactionId!,
          axisFactionId: +state.axisFactionId!,
          factionId: +state.factionId!,
          mapId: +state.mapId!,
          title: state.title!,
        })
      )
    }
  }, [state, dispatch])

  function handleFinalStep() {
    if (
      [
        state.alliesFactionId,
        state.axisFactionId,
        state.mapId,
        state.title,
      ].every((v) => v)
    ) {
      return onOpen()
    }

    // TODO: Let the user know they missed something
    console.log('missing options')
  }

  if (isLoading) {
    return <Spinner withMessage />
  }

  const stateProps = {
    state,
    setState,
  }

  return (
    <BaseLayout.FullContainer>
      <Container
        maxW="container.md"
        h={{ base: '100%', md: 'calc(100% - 128px)' }}
      >
        <Title value="Create Strategy" />
        <ChooseAxisFaction {...stateProps} />
        <ChooseAlliesFaction {...stateProps} />
        <StrategyTitle {...stateProps} />
        <ChooseMap {...stateProps} />
        <Footer handleFinalStep={handleFinalStep} />
      </Container>
      <CreateModal isOpen={isOpen} onClose={onClose} {...stateProps} />
    </BaseLayout.FullContainer>
  )
}
