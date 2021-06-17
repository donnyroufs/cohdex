import { TMap } from '../logic/tactical-map'
import { StrategyService } from '../services/StrategyService'

export const strategyService = new StrategyService(TMap)
