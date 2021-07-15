import {
  Box,
  Button,
  Image,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Heading,
  Text,
  OrderedList,
  ListItem,
} from '@chakra-ui/react'
import { IAddCommandToStrategyUnitDto, ICommand } from '@cohdex/shared'
import { IPointPosition } from '@cohdex/shared'
import React, { useState } from 'react'
import { BiHelpCircle } from 'react-icons/bi'
import { useProviders } from '../../../../hooks/useProviders'
import { InteractiveUnit } from '../../../../models/InteractiveUnit'
import { ReplayableCommand } from '../../../../models/ReplayableCommand'
import { Display, GameState } from '../../../../types'
import { replaceTgaWithPng } from '../../../../utils'
import { parsePointPositionName } from '../../../../utils/parsePointPositionName'
import { Line } from './Line'
import { PointPosition } from './PointPosition'
import { SwitchDisplay } from './SwitchDisplay'

export interface ITacticalMapProps {
  strategyId: number
  spawnpoint: number | null
  mapHeight: number
  mapUrl: string
  pointPositions: IPointPosition[]
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  activeUnit?: InteractiveUnit
  commands: ReplayableCommand[]
  handlePlay(): void
  playing: boolean
  setTick: React.Dispatch<React.SetStateAction<number>>
  max: number
  isOwner: boolean
}

export const TacticalMap: React.FC<ITacticalMapProps> = ({
  strategyId,
  spawnpoint,
  mapHeight,
  mapUrl,
  pointPositions,
  setGameState,
  activeUnit,
  commands,
  handlePlay,
  playing,
  setTick,
  max,
  isOwner,
}) => {
  const { strategyService } = useProviders()
  const scale = 700 / mapHeight
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [display, setDisplay] = useState<Display>('rectangle')

  function handleChangeDisplay() {
    setDisplay((curr) => (curr === 'circle' ? 'rectangle' : 'circle'))
  }

  async function handleChooseSpawnpoint(spawn: number) {
    await strategyService.chooseSpawnpoint(strategyId, spawn)
    setGameState((curr) => ({
      ...curr,
      spawnpoint: spawn,
    }))
  }

  async function onClickPointPosition(point: IPointPosition) {
    if (!activeUnit || !isOwner) return
    if (point.fileName.includes('starting')) return

    const alreadyCaptured = activeUnit.unit.commands.find(
      (c) => c.targetX === point.x && c.targetY === point.y
    )

    if (alreadyCaptured) {
      return
    }

    const obj: IAddCommandToStrategyUnitDto = {
      description: parsePointPositionName(point.fileName),
      targetX: point.x,
      targetY: point.y,
      strategyUnitsId: activeUnit.id,
      type: 'CAPTURE',
    }

    const localId = Math.random() * 1000

    const command: ICommand = {
      description: parsePointPositionName(point.fileName),
      targetX: point.x,
      targetY: point.y,
      strategyUnitsId: activeUnit.id,
      type: 'CAPTURE',
      id: localId,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1,
    }

    setGameState((curr) => ({
      ...curr,
      units: curr.units.map((u) => {
        if (u.id === activeUnit.id) {
          return {
            ...u,
            unit: {
              ...u.unit,
              commands: [...u.unit.commands, command],
            },
          }
        }
        return u
      }),
    }))

    setTick(max + 5)

    const { data } = await strategyService.addCommandToUnit(obj)

    setGameState((curr) => ({
      ...curr,
      units: curr.units.map((u) => {
        if (u.id === activeUnit.id) {
          return {
            ...u,
            unit: {
              ...u.unit,
              commands: u.unit.commands.map((c) =>
                c.id === localId
                  ? {
                      ...c,
                      ...data.command,
                    }
                  : c
              ),
            },
          }
        }
        return u
      }),
    }))
  }

  return (
    <Box
      backgroundColor="header"
      h="840px"
      w="1000px"
      border="1px solid"
      borderRadius={4}
      borderColor="border"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      p={8}
      mr={0}
      userSelect="none"
    >
      <Box
        as="header"
        flex={1}
        display="flex"
        pb={6}
        justifyContent="space-between"
        alignItems="flex-start"
        w="100%"
      >
        <IconButton
          icon={<BiHelpCircle color="white" fontSize={24} />}
          aria-label="instructions"
          background="primary.600"
          variant="unstyled"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="0"
          _hover={{
            opacity: 0.8,
          }}
          onClick={onOpen}
        />

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          motionPreset="scale"
        >
          <ModalOverlay />
          <ModalContent
            maxW="550px"
            bg="background.900"
            border="1px solid"
            borderColor="border"
            p={4}
          >
            <ModalCloseButton color="vintage.400" />
            <ModalBody mt={6} mb={6}>
              <Heading size="lg" mb={2} color="vintage.400">
                Instructions
              </Heading>
              <Text mb={6} color="text.400">
                Start clicking on capture points and see the magic happen.
                <br /> Remove commands / units by right clicking.
              </Text>
              <Heading mb={2} size="lg" color="vintage.400">
                How does it work?
              </Heading>
              <Text mb={6} color="text.400">
                Every unit will spawn 5 ticks later on the map this way it can
                easily create a replayable strategy for you
              </Text>
              <Heading mb={2} size="lg" color="vintage.400">
                Upcoming
              </Heading>
              <Text mb={6}>
                <OrderedList color="text.400">
                  <ListItem>
                    Integrated game logic, that way it's more true to the real
                    game.
                  </ListItem>
                  <ListItem>
                    Being able to build/place sandbags, mines...
                  </ListItem>
                  <ListItem>Unit direction</ListItem>
                  <ListItem>Move Command</ListItem>
                </OrderedList>
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>

        <SwitchDisplay
          display={display}
          handleChangeDisplay={handleChangeDisplay}
        />
      </Box>
      <Box position="relative">
        <Box position="relative">
          <Image
            border="6px solid"
            borderColour="border"
            src={replaceTgaWithPng(mapUrl)}
            alt="tactical map"
            borderRadius={display === 'circle' ? '100%' : 0}
            minH={700}
            h={700}
            minW={700}
            w={700}
          />
          <svg
            height="700"
            width="700"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {commands.map((c, i) => (
              <Line
                key={i}
                x1={c.pos.x}
                x2={c.target.x}
                y1={c.pos.y}
                y2={c.target.y}
                scale={scale}
                colour={c.colour}
                id={c.unitId}
                activeUnit={activeUnit}
              />
            ))}
          </svg>
          {pointPositions.map((p) => (
            <PointPosition
              key={p.id}
              point={p}
              scale={scale}
              onClickPointPosition={onClickPointPosition}
            />
          ))}
          {/* {commands.map((c, i) => (
            <Box
              key={i}
              pos="absolute"
              top={singleCoordinateToScreen(c.target.y, scale)}
              right={singleCoordinateToScreen(c.target.x, scale)}
              color="cyan"
              fontSize="1.5rem"
            >
              {c.unitId}
            </Box>
          ))} */}
        </Box>
        {!spawnpoint && (
          <Box
            position="absolute"
            top="0"
            color="white"
            fontSize="4xl"
            zIndex="10"
            h="100%"
            w="100%"
            background="rgb(22, 31, 40, .75)"
            borderRadius={display === 'circle' ? '100%' : '0%'}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              w={16}
              h={16}
              display="flex"
              justifyContent="center"
              alignItems="center"
              mr={4}
              background="background.700"
              borderRadius="100%"
              variant="unstyled"
              fontSize="2xl"
              _hover={{
                background: 'primary.600',
                cursor: 'pointer',
                transition: '.15s all ease-in-out',
              }}
              onClick={() => handleChooseSpawnpoint(1)}
            >
              1
            </Button>
            <Button
              w={16}
              h={16}
              fontSize="2xl"
              display="flex"
              justifyContent="center"
              variant="unstyled"
              alignItems="center"
              background="background.700"
              borderRadius="100%"
              _hover={{
                background: 'primary.600',
                cursor: 'pointer',
                transition: '.15s all ease-in-out',
              }}
              onClick={() => handleChooseSpawnpoint(2)}
            >
              2
            </Button>
          </Box>
        )}
      </Box>
      <Box
        as="footer"
        w="100%"
        flex={1}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button
          onClick={handlePlay}
          variant="unstyled"
          background="primary.600"
          color="white"
          _hover={{ opacity: 0.8 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          w={20}
          borderRadius="0"
        >
          {playing && 'stop'}
          {!playing && 'start'}
        </Button>
      </Box>
    </Box>
  )
}
