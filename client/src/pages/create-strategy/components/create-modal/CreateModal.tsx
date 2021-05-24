import React, { useMemo } from 'react'
import { ChooseFactionMenu } from '..'
import { fetchCreateStrategy } from '../../../../store/slices/strategiesSlice'
import { useAppDispatch } from '../../../../store/store'
import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import {
  FactionTeam,
  Identifier,
  IFactionOptions,
  IStrategiesState,
} from '../../../../types'

export interface ICreateModalProps {
  isOpen: boolean
  onClose: () => void
  strategies: IStrategiesState
}

export const CreateModal: React.FC<ICreateModalProps> = ({
  isOpen,
  onClose,
  strategies,
}) => {
  const dispatch = useAppDispatch()

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

  return (
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
  )
}
