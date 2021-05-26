import axios, { AxiosInstance } from 'axios'

export abstract class BaseApi {
  protected readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      withCredentials: true,
      xsrfCookieName: 'csrf-token',
      // validateStatus: (status) => status >= 200 && status < 300,
    })

    // this.axios.interceptors.response.use(
    //   (response) => response,
    //   (err) => {
    //     Promise.reject(err.response.data)
    //   }
    // )
  }

  abstract prefix: string

  protected endpoint(endpoint: string = '/') {
    return this.prefix + endpoint
  }
}
