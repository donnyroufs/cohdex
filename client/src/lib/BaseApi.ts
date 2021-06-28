import axios, { AxiosInstance } from 'axios'

export abstract class BaseApi {
  protected readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL + '/api/v1',
      withCredentials: true,
    })
  }

  abstract prefix: string

  protected endpoint(endpoint: string = '/') {
    return this.prefix + endpoint
  }
}
