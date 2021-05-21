import path from 'path'
import { IAppConfig } from '@kondah/core'

export const AppConfig: IAppConfig = {
  'http-controller': {
    controllersPath: [path.join(__dirname, '../src/controllers')],
    catchExceptions: true,
  },
}
