import React, { useEffect, useState } from 'react'
import { difference, uniq } from 'lodash'
import { Spinner, Title } from '../../components'
import { BaseLayout } from '../../components/layouts'
import {
  restore,
  fetchCreateStrategy,
  fetchFactions,
  fetchMaps,
  nullifyError,
} from '../../store/slices/strategiesSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import {
  ChooseAlliesFaction,
  ChooseMap,
  CreateModal,
  Footer,
  StrategyTitle,
} from './components'
import { Box, Container } from '@chakra-ui/layout'
import { useDisclosure } from '@chakra-ui/react'
import { ChooseAxisFaction } from './components'
import { IStrategiesLocalState, MissingFieldsState } from '../../types'
import { useHistory } from 'react-router-dom'

function createErrorMessage(field: MissingFieldsState) {
  // Remove id suffix
  const _field = field.includes('title') ? field : field.slice(0, -2)

  if (_field.includes('map')) {
    return 'You have not yet chosen a map'
  }

  if (_field.includes('axis')) {
    return 'You forgot to select an Axis faction'
  }

  if (_field.includes('allies')) {
    return 'You forgot to select an Allies faction'
  }

  if (_field.includes('title')) {
    return 'You forgot to enter a title'
  }

  return `Missing input for ${_field}`
}

export const CreateStrategy = () => {
  const [state, setState] = useState<IStrategiesLocalState>({})
  const [missingFields, setMissingFields] = useState<MissingFieldsState[]>([])
  const isLoading = useAppSelector((state) => state.strategies.isLoading)
  const error = useAppSelector((state) => state.strategies.error)
  const slug = useAppSelector((state) => state.strategies.slug)
  const history = useHistory()
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

  useEffect(() => {
    if (slug) {
      history.push('/strategy/' + slug)
      dispatch(restore())
    }

    if (error) {
      setState(({ factionId, ...curr }) => ({
        ...curr,
      }))
      onClose()
    }
  }, [slug, history, dispatch, error, onClose])

  function handleFinalStep() {
    const fields = ['axisFactionId', 'alliesFactionId', 'title', 'mapId']

    const _missingFields = difference(
      fields,
      Object.keys(state)
    ) as MissingFieldsState[]

    if (_missingFields.length <= 0 && Object.values(state).every((v) => v)) {
      setMissingFields([])
      dispatch(nullifyError())
      return onOpen()
    }

    const emptyValues = Object.entries(state)
      .filter(([k, v]) => !v)
      .map(([k, v]) => k)

    const values = [...emptyValues, ..._missingFields]
    setMissingFields(uniq(values) as MissingFieldsState[])
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
        <Box
          display={`${missingFields.length > 0 || error ? 'flex' : 'none'}`}
          background="header"
          p={6}
          textAlign="center"
          color="vintage.300"
          border="1px solid"
          borderColor="primary.600"
          mt={8}
        >
          {missingFields.length > 0 && createErrorMessage(missingFields[0])}
          {error && error}
        </Box>
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
