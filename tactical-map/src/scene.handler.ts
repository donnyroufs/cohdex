import { Scene } from './scenes/scene'
import { NewableScene } from './types'

export interface ICurrentScene {
  scene: Scene | null
  payload: unknown
}

export class SceneHandler {
  private readonly _scenes: Scene[] = []
  private _currentScene: ICurrentScene = {
    scene: null,
    payload: null,
  }

  constructor(scenes: NewableScene[]) {
    this._scenes = scenes.map((scene) => new scene(this))
  }

  public async setCurrentAndStart<T extends Object>(
    scene: NewableScene,
    payload?: T
  ) {
    const foundScene = this._scenes.find(
      (s) => s.constructor.name === scene.name
    )

    if (!foundScene) {
      throw new Error('scene does not exist')
    }

    this._currentScene = {
      scene: foundScene,
      payload,
    }

    await this.start()
  }

  public async start() {
    const { scene, payload } = this._currentScene

    if (!scene) {
      throw new Error('There is no active scene')
    }

    await scene.setup(payload as any)
  }
}
