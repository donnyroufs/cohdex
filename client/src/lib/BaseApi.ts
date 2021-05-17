import axios, { AxiosInstance } from 'axios'

export abstract class BaseApi {
  protected readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      withCredentials: true,
    })
  }

  abstract prefix: string

  protected endpoint(endpoint: string = '/') {
    return this.prefix + endpoint
  }
}
