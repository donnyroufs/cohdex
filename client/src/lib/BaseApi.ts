import axios, { AxiosInstance } from 'axios'

export abstract class BaseApi {
  protected readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      withCredentials: true,
      xsrfCookieName: 'csrf-token',
      headers: {
        'Access-Control-Allow-Origin': process.env.REACT_APP_BASE_URL,
      },
    })
  }

  abstract prefix: string

  protected endpoint(endpoint: string = '/') {
    return process.env.REACT_APP_BASE_URL + '/api/v1' + this.prefix + endpoint
  }
}
