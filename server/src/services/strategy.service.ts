import { ICreateStrategyDto, ICreateStrategyUnitDto } from '@cohdex/shared'
import { Injectable } from '@kondah/core'
import {
  AddCommandToStrategyUnitDto,
  ChooseSpawnPointDto,
  RemoveCommandFromStrategyUnitDto,
} from '../dtos'
import {
  InvalidFactionsException,
  InvalidTeamsException,
  ChosenFactionDoesNotExistException,
  StrategyAlreadyExistsException,
  UnitDoesNotBelongToFactionException,
} from '../exceptions'
import { UnknownStrategyException } from '../exceptions/domain/unknown-strategy.exception'
import { StrategyRepository } from '../repositories/strategy.repository'

@Injectable()
export class StrategyService {
  constructor(private readonly _strategyRepo: StrategyRepository) {}

  async all(id: number) {
    return this._strategyRepo.all(id)
  }

  async findOne(userId: number, slug: string) {
    return this._strategyRepo.findOne(userId, slug)
  }

  // Should probably check if owner of strategy
  // even though repo already does that.
  async addCommandToStrategyUnit(data: AddCommandToStrategyUnitDto) {
    // TODO: Add validation to check if the position could be valid for the given strategy map

    return this._strategyRepo.addCommandToStrategyUnit(data)
  }

  // Should probably check if owner of strategy
  // even though repo already does that.
  async removeCommandFromStrategyUnit(data: RemoveCommandFromStrategyUnitDto) {
    return this._strategyRepo.removeCommandFromStrategyUnit(data)
  }

  async addUnitToStrategy(data: ICreateStrategyUnitDto) {
    const foundFaction = await this._strategyRepo.getFactionByStrategyId(
      data.strategyId
    )

    if (!foundFaction) {
      throw new UnknownStrategyException()
    }

    const factions = await this._strategyRepo.getUnitsByFaction()

    const belongsToFaction = factions.find(
      (f) =>
        foundFaction.Faction.id === f.id &&
        f.units.some((u) => u.id === data.unitId)
    )

    if (!belongsToFaction) {
      throw new UnitDoesNotBelongToFactionException()
    }

    return this._strategyRepo.addUnit(data)
  }

  async create(data: ICreateStrategyDto) {
    if (data.alliedFactionId === data.axisFactionId) {
      throw new InvalidFactionsException()
    }

    if (![data.alliedFactionId, data.axisFactionId].includes(data.factionId)) {
      throw new ChosenFactionDoesNotExistException()
    }

    const factions = await this._strategyRepo.getAllFactions()

    const alliedFaction = factions.find((f) => f.id === data.alliedFactionId)!
    const axisFaction = factions.find((f) => f.id === data.axisFactionId)!

    if (alliedFaction.team !== 'ALLIES' || axisFaction.team !== 'AXIS') {
      throw new InvalidTeamsException()
    }

    const isNotUnique = await this._strategyRepo.notUnique(data)

    if (isNotUnique) {
      throw new StrategyAlreadyExistsException()
    }

    const startingUnit = await this.getStartingUnitForFactionById(
      data.factionId
    )

    // Starting unit should always be defined so we can assert it here
    return this._strategyRepo.create(data, startingUnit!)
  }

  async getAllMaps() {
    return this._strategyRepo.getAllMaps()
  }

  async getAllFactions() {
    return this._strategyRepo.getAllFactions()
  }

  async getStartingUnitForFactionById(factionId: number) {
    return this._strategyRepo.getStartingUnitForFactionById(factionId)
  }

  async chooseSpawnpoint(spawn: ChooseSpawnPointDto) {
    return this._strategyRepo.chooseSpawnpoint(spawn)
  }
}
