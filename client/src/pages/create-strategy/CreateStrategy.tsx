import React, { useEffect } from 'react'
import { Spinner, Title } from '../../components'
import { BaseLayout } from '../../components/layouts'
import { fetchFactions, fetchMaps } from '../../store/slices/strategiesSlice'
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

export const CreateStrategy = () => {
  const dispatch = useAppDispatch()
  const strategies = useAppSelector((state) => state.strategies)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    dispatch(fetchFactions())
    dispatch(fetchMaps())
  }, [dispatch])

  function handleFinalStep() {
    if (
      [
        strategies.alliesFactionId,
        strategies.axisFactionId,
        strategies.mapId,
        strategies.title,
      ].every((v) => v)
    ) {
      return onOpen()
    }

    // TODO: Let the user know they missed something
    console.log('missing options')
  }

  if (strategies.isLoading) {
    return <Spinner withMessage />
  }

  return (
    <BaseLayout.FullContainer>
      <Container
        maxW="container.md"
        h={{ base: '100%', md: 'calc(100% - 128px)' }}
      >
        <Title value="Create Strategy" />
        <ChooseAxisFaction strategies={strategies} />
        <ChooseAlliesFaction strategies={strategies} />
        <StrategyTitle strategies={strategies} />
        <ChooseMap strategies={strategies} />
        <Footer handleFinalStep={handleFinalStep} />
      </Container>
      <CreateModal isOpen={isOpen} onClose={onClose} strategies={strategies} />
    </BaseLayout.FullContainer>
  )
}
