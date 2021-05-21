import { Injectable } from '@kondah/core'
import { CreateStrategyDto } from '../dtos/create-strategy.dto'
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

  async create(data: CreateStrategyDto) {
    if (data.alliesFactionId === data.axisFactionId) {
      throw new InvalidFactionsException()
    }

    if (![data.alliesFactionId, data.axisFactionId].includes(data.factionId)) {
      throw new ChosenFactionDoesNotExistException()
    }

    const factions = await this._strategyRepo.getAllFactions()

    const alliesFaction = factions.find((f) => f.id === data.alliesFactionId)!
    const axisFaction = factions.find((f) => f.id === data.axisFactionId)!

    if (alliesFaction.team !== 'ALLIES' || axisFaction.team !== 'AXIS') {
      throw new InvalidTeamsException()
    }

    const isNotUnique = await this._strategyRepo.notUnique(data)

    if (isNotUnique) {
      throw new StrategyAlreadyExistsException()
    }

    return this._strategyRepo.create(data)
  }
}
