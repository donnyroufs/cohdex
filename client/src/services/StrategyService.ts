import { ICreateStrategyUnitDto } from '../../../shared/dist'
import { strategiesApi } from '../api'
import { BaseService } from '../lib'

export class StrategyService extends BaseService {
  protected api = strategiesApi

  async getStrategy(slug: string) {
    return this.api.getStrategy(slug)
  }

  async addUnit(data: ICreateStrategyUnitDto) {
    return this.api.addUnitToStrategy(data)
  }

  async chooseSpawnpoint(strategyId: number, spawn: number) {
    return this.api.chooseSpawnpoint(strategyId, spawn)
  }
}
