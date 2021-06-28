import axios, { AxiosInstance } from 'axios'

export abstract class BaseApi {
  protected readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      withCredentials: true,
      xsrfCookieName: 'csrf-token',
    })
  }

  abstract prefix: string

  protected endpoint(endpoint: string = '/') {
    return '/api/v1' + this.prefix + endpoint
  }
}
