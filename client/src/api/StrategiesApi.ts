import {
  BaseHttpResponse,
  ICreateStrategyResponseDto,
  ICreateStrategyDto,
  IGetFactionsResponseDto,
  IGetMapsResponseDto,
  IGetAllUserStrategiesResponseDto,
  IGetStrategyResponseDto,
  ICreateStrategyUnitDto,
  ICreateStrategyUnitResponseDto,
  IAddCommandToStrategyUnitDto,
  IAddCommandToStrategyUnitResponseDto,
  IRemoveCommandFromStrategyUnit,
  IUpdateStrategyUnitColourDto,
  IRemoveUnitFromStrategyDto,
} from '@cohdex/shared'
import { BaseApi } from '../lib/BaseApi'

export const strategiesApi = new (class StrategiesApi extends BaseApi {
  prefix = '/strategies'

  async addUnitToStrategy(
    data: ICreateStrategyUnitDto
  ): Promise<BaseHttpResponse<ICreateStrategyUnitResponseDto>> {
    return this.axios
      .post(this.endpoint('/unit'), data)
      .then(({ data }) => data)
  }

  async addCommandToUnit(
    data: IAddCommandToStrategyUnitDto
  ): Promise<BaseHttpResponse<IAddCommandToStrategyUnitResponseDto>> {
    return this.axios
      .post(this.endpoint('/command'), data)
      .then(({ data }) => data)
  }

  async chooseSpawnpoint(
    strategyId: number,
    spawnpoint: number
  ): Promise<void> {
    return this.axios.patch(this.endpoint(`/${strategyId}/spawnpoint`), {
      spawnpoint,
    })
  }

  async getStrategy(
    slug: string
  ): Promise<BaseHttpResponse<IGetStrategyResponseDto>> {
    return this.axios.get(this.endpoint('/') + slug).then(({ data }) => data)
  }

  async getAllUserStrategies(): Promise<
    BaseHttpResponse<IGetAllUserStrategiesResponseDto>
  > {
    return this.axios.get(this.endpoint('/')).then(({ data }) => data)
  }

  async createStrategy(
    payload: ICreateStrategyDto
  ): Promise<BaseHttpResponse<ICreateStrategyResponseDto, string>> {
    return this.axios
      .post(this.endpoint('/'), payload)
      .then(({ data }) => data)
      .catch((err) => err.response.data)
  }

  async getFactions(): Promise<BaseHttpResponse<IGetFactionsResponseDto>> {
    return this.axios.get(this.endpoint('/factions')).then(({ data }) => data)
  }

  async getMaps(): Promise<BaseHttpResponse<IGetMapsResponseDto>> {
    return this.axios.get(this.endpoint('/maps')).then(({ data }) => data)
  }

  async removeCommandFromUnit(data: IRemoveCommandFromStrategyUnit) {
    return this.axios.delete(this.endpoint(`/command/${data.id}`))
  }

  async removeUnitFromStrategy(data: IRemoveUnitFromStrategyDto) {
    return this.axios.delete(this.endpoint(`/unit/${data.id}`))
  }

  async changeUnitColour(data: IUpdateStrategyUnitColourDto, unitId: number) {
    return this.axios.patch(this.endpoint(`/unit/${unitId}/colour`), data)
  }
})()
