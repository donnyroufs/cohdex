import { Injectable } from '@kondah/core'
import { StrategyRepository } from './strategy.repository'

@Injectable()
export class StrategyService {
  constructor(private readonly strategyRepo: StrategyRepository) {}
}
