import {
  BaseHttpResponse,
  ICreateStrategyRequestDto,
  ICreateStrategyResponseDto,
  IGetFactionsResponseDto,
  IGetMapsResponseDto,
} from '@cohdex/shared'
import { BaseApi } from '../lib/BaseApi'

export const strategiesApi = new (class StrategiesApi extends BaseApi {
  prefix = '/strategies'

  // TODO: Fix error type
  async createStrategy(
    payload: ICreateStrategyRequestDto
  ): Promise<BaseHttpResponse<ICreateStrategyResponseDto, unknown>> {
    return this.axios.post(this.endpoint('/'), payload).then(({ data }) => data)
  }

  async getFactions(): Promise<BaseHttpResponse<IGetFactionsResponseDto>> {
    return this.axios.get(this.endpoint('/factions')).then(({ data }) => data)
  }

  async getMaps(): Promise<BaseHttpResponse<IGetMapsResponseDto>> {
    return this.axios.get(this.endpoint('/maps')).then(({ data }) => data)
  }
})()
