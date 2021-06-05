import { ICreateStrategyDto } from '@cohdex/shared'
import { Injectable } from '@kondah/core'
import {
  InvalidFactionsException,
  InvalidTeamsException,
  ChosenFactionDoesNotExistException,
  StrategyAlreadyExistsException,
} from '../exceptions'
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

    return this._strategyRepo.create(data)
  }

  async getAllMaps() {
    return this._strategyRepo.getAllMaps()
  }

  async getAllFactions() {
    return this._strategyRepo.getAllFactions()
  }
}
