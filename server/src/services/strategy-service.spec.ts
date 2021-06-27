/* eslint-disable @typescript-eslint/no-explicit-any */
import { BeforeEach, Describe, It, Test } from '@jest-decorated/core'
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

@Describe()
class StrategyServiceTest {
  service: StrategyService

  @BeforeEach()
  createServices() {
    this.service = new StrategyService(mockedRepo)
  }

  @Test()
  BeDefined() {
    const service = new StrategyService(undefined!)
    expect(service).toBeDefined()
  }

  @Test()
  async CreateAUnitForTheGivenStrategy() {
    const service = new StrategyService(mockedRepo)

    const result = await service.addUnitToStrategy({
      strategyId: 1,
      unitId: 1,
      colour: 'green',
    })

    expect(result).toStrictEqual({ id: 1 })
  }

  @Test()
  async ThrowWhenAddingUnitToNonExistingStrategy() {
    const service = new StrategyService(mockedRepo)
    await expect(
      service.addUnitToStrategy({
        strategyId: 2,
        unitId: 1,
        colour: 'green',
      })
    ).rejects.toThrowError(new UnknownStrategyException())
  }

  @Test()
  async ThrowWhenAddingAUnitThatDoesNotBelongToTheFaction() {
    const service = new StrategyService(mockedRepo)

    await expect(
      service.addUnitToStrategy({
        strategyId: 1,
        unitId: 2,
        colour: 'green',
      })
    ).rejects.toThrowError(new UnitDoesNotBelongToFactionException())
  }

  @Test()
  async AddAStrategy() {
    const service = new StrategyService(mockedRepo)
    const data = await service.create(createProps)

    expect(data).toBeTruthy()
  }

  // Perhaps E2E, dont want to mock this really.
  @Test.skip()
  async AddStartingUnitToStrategyUponCreation() {
    const service = new StrategyService(mockedRepo)
    const data = await service.create(createProps)

    expect(data).toBeTruthy()
  }
}

@Describe()
class CreatingAStrategyShouldThrowWhen {
  service: StrategyService

  @BeforeEach()
  createServices() {
    this.service = new StrategyService(mockedRepo)
  }

  @Test()
  async FactionsAreTheSame() {
    await expect(
      this.service.create(
        new CreateStrategyDto({
          ...createProps,
          alliedFactionId: 1,
          axisFactionId: 1,
        })
      )
    ).rejects.toThrowError(new InvalidFactionsException())
  }

  @Test()
  async FactionDoesNotExist() {
    await expect(
      this.service.create(
        new CreateStrategyDto({
          ...createProps,
          factionId: 8,
        })
      )
    ).rejects.toThrowError(new ChosenFactionDoesNotExistException())

    await expect(
      this.service.create(
        new CreateStrategyDto({
          ...createProps,
          alliedFactionId: 8,
          axisFactionId: 1,
        })
      )
    ).rejects.toThrowError(new ChosenFactionDoesNotExistException())

    await expect(
      this.service.create(
        new CreateStrategyDto({
          ...createProps,
          alliedFactionId: 1,
          axisFactionId: 8,
        })
      )
    ).rejects.toThrowError(new ChosenFactionDoesNotExistException())
  }

  @Test()
  async DoesNotHaveAnAlliesAndAxisFaction() {
    await expect(
      this.service.create(
        new CreateStrategyDto({
          ...createProps,
          alliedFactionId: 2,
          axisFactionId: 1,
          factionId: 2,
        })
      )
    ).rejects.toThrowError(new InvalidTeamsException())
  }

  @Test()
  async AlreadyExists() {
    const service = new StrategyService({
      ...mockedRepo,
      notUnique: () => true,
    })

    expect(service.create(createProps)).rejects.toThrowError(
      new StrategyAlreadyExistsException()
    )
  }
}
