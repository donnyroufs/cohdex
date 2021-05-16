import { AppContext, Energizor, Kondah } from '@kondah/core'

// TODO: Official Kondah plugin should expose interface for this
const API_VERSION = 'api/v1'

export class Application extends Kondah {
  protected async configureServices(services: Energizor) {}

  protected async setup({ server, addControllers }: AppContext) {
    await addControllers('/api/v1')
    server.run(5000)
  }
}
