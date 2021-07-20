import {
  IAddCommandToStrategyUnitDto,
  IGetStrategyDto,
  IRemoveCommandFromStrategyUnit,
  IRemoveUnitFromStrategyDto,
  IUnit,
  IUpdateStrategyUnitColourDto,
  IUpdateStrategyVisibilityDto,
} from '@cohdex/shared'
import { strategiesApi } from '../api'
import { BaseService } from '../lib'

export class StrategyService extends BaseService {
  protected api = strategiesApi

  async getStrategy(data: IGetStrategyDto) {
    return this.api.getStrategy(data)
  }

  async addUnit(id: number, unit: IUnit, colour: string) {
    const res = await this.api.addUnitToStrategy({
      strategyId: id,
      unitId: unit.id,
      colour,
    })

    return {
      id: res.data.strategyUnit.id,
      unit,
    }
  }

  async chooseSpawnpoint(strategyId: number, spawn: number) {
    await this.api.chooseSpawnpoint(strategyId, spawn)
  }

  async addCommandToUnit(data: IAddCommandToStrategyUnitDto) {
    return this.api.addCommandToUnit(data)
  }

  async removeCommandFromUnit(data: IRemoveCommandFromStrategyUnit) {
    return this.api.removeCommandFromUnit(data)
  }

  async removeUnitFromStrategy(data: IRemoveUnitFromStrategyDto) {
    return this.api.removeUnitFromStrategy(data)
  }

  async changeUnitColour(data: IUpdateStrategyUnitColourDto, unitId: number) {
    return this.api.changeUnitColour(data, unitId)
  }

  async updateStrategyVisibility(data: IUpdateStrategyVisibilityDto) {
    return this.api.updateStrategyVisibility(data)
  }

  async getRecentPublicStrategies() {
    return this.api.getRecentPublicStrategies()
  }
}
