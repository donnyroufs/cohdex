/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateStrategyDto } from '../dtos/create-strategy.dto'
import {
  ChosenFactionDoesNotExistException,
  InvalidFactionsException,
  InvalidTeamsException,
} from '../exceptions'
import { StrategyService } from './strategy.service'

const createProps = {
  alliesFactionId: 3,
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
} as any

describe('strategy service', () => {
  it('should be defined', () => {
    const service = new StrategyService(undefined!)

    expect(service).toBeDefined()
  })

  describe('create strategy', () => {
    it.skip('should add a default title when first strategy', () => {})
  })

  describe('create strategy validation should throw when', () => {
    const service = new StrategyService(mockedRepo)

    it('has the same faction for both allies and axis', async () => {
      await expect(
        service.create(
          new CreateStrategyDto({
            ...createProps,
            alliesFactionId: 1,
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
            alliesFactionId: 8,
            axisFactionId: 1,
          })
        )
      ).rejects.toThrowError(new ChosenFactionDoesNotExistException())

      await expect(
        service.create(
          new CreateStrategyDto({
            ...createProps,
            alliesFactionId: 1,
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
            alliesFactionId: 2,
            axisFactionId: 1,
            factionId: 2,
          })
        )
      ).rejects.toThrowError(new InvalidTeamsException())
    })

    it.skip('already exists', () => {})
  })
})
