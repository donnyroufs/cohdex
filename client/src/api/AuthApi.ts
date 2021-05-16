import { BaseApi } from '../lib/BaseApi'
import { IGetMeResponseDto } from '../types'

export const authApi = new (class AuthApi extends BaseApi {
  prefix = 'auth'

  public async me(): Promise<IGetMeResponseDto> {
    const { data } = await this.axios.get(this.endpoint('/me'))
    return data
  }
})()
