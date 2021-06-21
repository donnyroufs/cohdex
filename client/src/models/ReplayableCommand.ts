import { IUnitWithCommands } from '../../../shared/dist'
import { Tick } from '../types'
// export type Tick = number

export class Vec2 {
  constructor(public x: number, public y: number) {}
}

export class Entity {
  constructor(public pos: Vec2) {}
}

export class ReplayableCommand extends Entity {
  constructor(
    pos: Vec2,
    public readonly target: Vec2,
    public readonly tick: Tick,
    public readonly unitId: number
  ) {
    super(pos)
  }
}
