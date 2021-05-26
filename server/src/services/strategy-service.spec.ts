/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateStrategyDto } from '../dtos/create-strategy.dto'
import {
  ChosenFactionDoesNotExistException,
  InvalidFactionsException,
  InvalidTeamsException,
  StrategyAlreadyExistsException,
} from '../exceptions'
import { StrategyService } from './strategy.service'

const createProps = {
  alliedFactionId: 3,
  axisFactionId: 1,
  factionId: 3,
  mapId: 1,
  title: 'some title',
  userId: 1,
}

const mockedRepo = {
  create: async () => true,
  getAllFactions: async () => [
    { id: 1, team: 'AXIS' },
    { id: 2, team: 'AXIS' },
    { id: 3, team: 'ALLIES' },
    { id: 4, team: 'ALLIES' },
    { id: 5, team: 'ALLIES' },
  ],
  notUnique: async () => false,
} as any

describe('strategy service', () => {
  it('should be defined', () => {
    const service = new StrategyService(undefined!)

    expect(service).toBeDefined()
  })

  describe('create strategy', () => {
    it('should create a strategy', async () => {
      const service = new StrategyService(mockedRepo)
      const data = await service.create(createProps)

      expect(data).toBeTruthy()
    })

    describe('create strategy validation should throw when', () => {
      const service = new StrategyService(mockedRepo)

      it('has the same faction for both allies and axis', async () => {
        await expect(
          service.create(
            new CreateStrategyDto({
              ...createProps,
              alliedFactionId: 1,
              axisFactionId: 1,
            })
          )
        ).rejects.toThrowError(new InvalidFactionsException())
      })

      it('has a faction that does not exist', async () => {
        await expect(
          service.create(
            new CreateStrategyDto({
              ...createProps,
              factionId: 8,
            })
          )
        ).rejects.toThrowError(new ChosenFactionDoesNotExistException())

        await expect(
          service.create(
            new CreateStrategyDto({
              ...createProps,
              alliedFactionId: 8,
              axisFactionId: 1,
            })
          )
        ).rejects.toThrowError(new ChosenFactionDoesNotExistException())

        await expect(
          service.create(
            new CreateStrategyDto({
              ...createProps,
              alliedFactionId: 1,
              axisFactionId: 8,
            })
          )
        ).rejects.toThrowError(new ChosenFactionDoesNotExistException())
      })

      it('does not have an axis and allies faction', async () => {
        await expect(
          service.create(
            new CreateStrategyDto({
              ...createProps,
              alliedFactionId: 2,
              axisFactionId: 1,
              factionId: 2,
            })
          )
        ).rejects.toThrowError(new InvalidTeamsException())
      })

      it('already exists', () => {
        const service = new StrategyService({
          ...mockedRepo,
          notUnique: () => true,
        })

        expect(service.create(createProps)).rejects.toThrowError(
          new StrategyAlreadyExistsException()
        )
      })
    })
  })
})
