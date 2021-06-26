import {
  IAddCommandToStrategyUnitDto,
  IRemoveCommandFromStrategyUnit,
  IUnit,
  IUpdateStrategyUnitColourDto,
} from '@cohdex/shared'
import { strategiesApi } from '../api'
import { BaseService } from '../lib'

export class StrategyService extends BaseService {
  protected api = strategiesApi

  async getStrategy(slug: string) {
    return this.api.getStrategy(slug)
  }

  // TODO: Alternate colour
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

  async changeUnitColour(data: IUpdateStrategyUnitColourDto) {
    return this.api.changeUnitColour(data)
  }
}
