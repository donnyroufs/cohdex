import { Injectable } from '@kondah/core'
import { ChosenFactionDoesNotExistException } from '../lib/chosen-faction-does-not-exist.exception'
import { InvalidFactionsException } from '../lib/invalid-factions.exception'
import { InvalidTeamsException } from '../lib/invalid-teams.exception'
import { CreateStrategyDto } from './dtos/create-strategy.dto'
import { StrategyRepository } from './strategy.repository'

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

    return this._strategyRepo.create(data)
  }
}
