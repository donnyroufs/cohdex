/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICreateStrategyUnitDto } from '../../../shared/dist'
import { CreateStrategyDto } from '../dtos/create-strategy.dto'
import {
  ChosenFactionDoesNotExistException,
  InvalidFactionsException,
  InvalidTeamsException,
  StrategyAlreadyExistsException,
  UnitDoesNotBelongToFactionException,
} from '../exceptions'
import { UnknownStrategyException } from '../exceptions/domain/unknown-strategy.exception'
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
  getFactionByStrategyId: async (id: number) => {
    if (id !== 1) return undefined

    return {
      Faction: {
        id: 1,
      },
    }
  },
  getStartingUnitForFactionById: (id: number) => {
    return id
  },
  getUnitsByFaction: async () => {
    return [
      {
        id: 1,
        units: [{ id: 1 }],
      },
    ]
  },
  addUnit: async (data: ICreateStrategyUnitDto) => {
    return { id: 1 }
  },
  notUnique: async () => false,
} as any

describe('strategy service', () => {
  it('should be defined', () => {
    const service = new StrategyService(undefined!)

    expect(service).toBeDefined()
  })

  describe('add unit', () => {
    it('should create a unit for the given strategy', async () => {
      const service = new StrategyService(mockedRepo)

      const result = await service.addUnitToStrategy({
        strategyId: 1,
        unitId: 1,
      })

      expect(result).toStrictEqual({ id: 1 })
    })

    describe('add unit should throw when', () => {
      it('does not have an existing strategy', async () => {
        const service = new StrategyService(mockedRepo)
        await expect(
          service.addUnitToStrategy({
            strategyId: 2,
            unitId: 1,
          })
        ).rejects.toThrowError(new UnknownStrategyException())
      })

      it('is trying to add a unit that does not belong to the faction', async () => {
        const service = new StrategyService(mockedRepo)

        await expect(
          service.addUnitToStrategy({
            strategyId: 1,
            unitId: 2,
          })
        ).rejects.toThrowError(new UnitDoesNotBelongToFactionException())
      })
    })
  })

  describe('create strategy', () => {
    it('should create a strategy', async () => {
      const service = new StrategyService(mockedRepo)
      const data = await service.create(createProps)

      expect(data).toBeTruthy()
    })

    // Perhaps E2E, dont want to mock this really.
    it.skip('should add a starting unit to the strategy upon creation', async () => {
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
