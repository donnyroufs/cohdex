import { IGetMeResponseDto, BaseHttpResponse } from '@cohdex/shared'
import { BaseApi } from '../lib/BaseApi'

export const authApi = new (class AuthApi extends BaseApi {
  prefix = '/auth'

  public async me(): Promise<BaseHttpResponse<IGetMeResponseDto, string>> {
    const { data } = await this.axios.get(this.endpoint('/me'))
    return data
  }

  public async logout(): Promise<void> {
    await this.axios.delete(this.endpoint('/logout'))
  }
})()
