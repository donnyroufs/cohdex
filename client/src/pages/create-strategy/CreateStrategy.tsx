import React, { useEffect, useMemo } from 'react'
import { Label, Spinner, Title } from '../../components'
import { BaseLayout } from '../../components/layouts'
import {
  fetchCreateStrategy,
  fetchFactions,
  fetchMaps,
  selectAlliesFaction,
  selectAxisFaction,
  selectFaction,
  selectMap,
  setTitle,
} from '../../store/slices/strategiesSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { FactionTeam, Identifier, IFactionOptions } from '../../types'
import { ChooseFactionMenu } from './components'
import Select from 'react-select'
import { Container, Heading, Link } from '@chakra-ui/layout'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'

// Add title
// Pick map (with searchable)
// Modal to pick your faction

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    // color: state.isSelected ? 'red' : 'blue',
    // padding: 20,
  }),
  menu: (provided: any, state: any) => ({}),
  control: (provided: any) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    background: '#14181D',
    borderColor: '#1F2938',
    padding: '0.6rem .2rem',
  }),
  // singleValue: (provided: any, state: any) => {
  //   const opacity = state.isDisabled ? 0.5 : 1
  //   const transition = 'opacity 300ms'

  //   return { ...provided, opacity, transition }
  // },
}

export const CreateStrategy = () => {
  const dispatch = useAppDispatch()
  const strategies = useAppSelector((state) => state.strategies)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    dispatch(fetchFactions())
    dispatch(fetchMaps())
  }, [dispatch])

  const chooseMapOptions = useMemo(
    () =>
      strategies.maps.map((m) => ({
        value: m.id,
        label: m.name,
      })),
    [strategies.maps]
  )

  const axisOptions: IFactionOptions[] = useMemo(
    () =>
      strategies.factions
        .filter((faction) => faction.team === 'AXIS')
        .map((faction) => ({
          id: faction.id,
          imgUrl: faction.imgUrl,
          alt: faction.team as FactionTeam,
        })),
    [strategies.factions]
  )

  const alliesOptions: IFactionOptions[] = useMemo(
    () =>
      strategies.factions
        .filter((faction) => faction.team === 'ALLIES')
        .map((faction) => ({
          id: faction.id,
          imgUrl: faction.imgUrl,
          alt: faction.team as FactionTeam,
        })),
    [strategies.factions]
  )

  const factionOptions: IFactionOptions[] = useMemo(
    () =>
      strategies.factions
        .filter((faction) =>
          [strategies.alliesFactionId, strategies.axisFactionId].includes(
            faction.id
          )
        )
        .map((faction) => ({
          id: faction.id,
          imgUrl: faction.imgUrl,
          alt: faction.team as FactionTeam,
        })),
    [strategies.alliesFactionId, strategies.axisFactionId, strategies.factions]
  )

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
    <BaseLayout.Container>
      <Container maxW="container.md">
        <Title value="Create Strategy" />
        <Label value="Axis" mb={6} />
        <ChooseFactionMenu
          options={axisOptions}
          onSelect={(payload: Identifier) =>
            dispatch(selectAxisFaction(payload))
          }
          selected={strategies.axisFactionId}
        />
        <Label value="Allies" mb={6} />
        <ChooseFactionMenu
          options={alliesOptions}
          onSelect={(payload: Identifier) =>
            dispatch(selectAlliesFaction(payload))
          }
          selected={strategies.alliesFactionId}
        />
        <Label value="Title" mb={6} />
        <Input
          placeholder="strategy title"
          background="badge"
          borderColor="border"
          h={14}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          value={strategies.title}
          color="text.400"
          fontSize={16}
          _placeholder={{
            color: 'text.600',
            textTransform: 'capitalize',
          }}
        />
        <Label value="Choose map" mb={6} />
        <Select
          options={chooseMapOptions}
          styles={customStyles}
          onChange={(e) => dispatch(selectMap(e?.value))}
        />
        <Button
          colorScheme="primary"
          w="full"
          mt={12}
          onClick={handleFinalStep}
          fontFamily="play"
        >
          Create
        </Button>
        <Box as="footer" textAlign="center" mb={12}>
          <Link
            href={process.env.REACT_APP_DISCORD_URL}
            color="text.600"
            display="block"
            my={4}
          >
            Map not here? Suggest it on
            <Box as="span" fontWeight="bold" color="primary.600" ml={1}>
              Discord
            </Box>
          </Link>
        </Box>
      </Container>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          padding={8}
          maxWidth="fit-content"
          backgroundColor="background.900"
        >
          <ModalHeader>
            <Heading color="text.600" textAlign="center">
              Choose Faction
            </Heading>
          </ModalHeader>
          <ModalBody>
            <ChooseFactionMenu
              options={factionOptions}
              onSelect={(payload: Identifier) => {
                dispatch(fetchCreateStrategy(payload))
              }}
              selected={strategies.factionId}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </BaseLayout.Container>
  )
}
