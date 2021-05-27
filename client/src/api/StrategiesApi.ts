import {
  BaseHttpResponse,
  ICreateStrategyResponseDto,
  ICreateStrategyDto,
  IGetFactionsResponseDto,
  IGetMapsResponseDto,
  IGetAllUserStrategiesResponseDto,
} from '@cohdex/shared'
import { BaseApi } from '../lib/BaseApi'

export const strategiesApi = new (class StrategiesApi extends BaseApi {
  prefix = '/strategies'

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
})()
