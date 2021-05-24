import React, { useMemo } from 'react'
import { ChooseFactionMenu } from '..'
import { useAppSelector } from '../../../../store/store'
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
  IStrategiesLocalState,
} from '../../../../types'

export interface ICreateModalProps {
  isOpen: boolean
  onClose: () => void
  state: IStrategiesLocalState
  setState: React.Dispatch<React.SetStateAction<IStrategiesLocalState>>
}

export const CreateModal: React.FC<ICreateModalProps> = ({
  isOpen,
  onClose,
  state,
  setState,
}) => {
  const factions = useAppSelector((state) => state.strategies.factions)

  const factionOptions: IFactionOptions[] = useMemo(
    () =>
      factions
        .filter((faction) =>
          [state.alliesFactionId, state.axisFactionId].includes(faction.id)
        )
        .map((faction) => ({
          id: faction.id,
          imgUrl: faction.imgUrl,
          alt: faction.team as FactionTeam,
        })),
    [state.alliesFactionId, state.axisFactionId, factions]
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
              setState((curr) => ({ ...curr, factionId: payload }))
            }}
            selected={state.factionId}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
