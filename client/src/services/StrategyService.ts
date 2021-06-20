import {
  IAddCommandToStrategyUnitDto,
  IUnitWithCommands,
} from '../../../shared/dist'
import { TacticalMap } from '../../../tactical-map/dist'
import { strategiesApi } from '../api'
import { BaseService } from '../lib'

export class StrategyService extends BaseService {
  protected api = strategiesApi

  constructor(private readonly tMap: TacticalMap) {
    super()
  }

  async getStrategy(slug: string) {
    return this.api.getStrategy(slug)
  }

  async addUnit(id: number, unit: IUnitWithCommands) {
    const res = await this.api.addUnitToStrategy({
      strategyId: id,
      unitId: unit.id,
    })

    return {
      id: res.data.strategyUnit.id,
      unit,
    }
    // this.tMap.addUnit({
    //   id: res.data.strategyUnit.id,
    //   unit,
    // })
  }

  async chooseSpawnpoint(strategyId: number, spawn: number) {
    await this.api.chooseSpawnpoint(strategyId, spawn)
  }

  async addCommandToUnit(data: IAddCommandToStrategyUnitDto) {
    return this.api.addCommandToUnit(data)
  }
}
