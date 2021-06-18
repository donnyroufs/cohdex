// @ts-nocheck
const SPAWN_TIME_IN_TICKS = 10

export class Vec2 {
  constructor(public x: number, public y: number) {}

  getDistance(vector: Vec2) {
    const xDist = vector.x - this.x
    const yDist = vector.y - this.y

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
  }
}

type CommandType = 'CAPTURE' | 'MOVE'

class Command {
  constructor(
    public readonly type: CommandType,
    public readonly entity: CapturePoint
  ) {}
}

export class CapturePoint {
  constructor(public pos: Vec2, public captureTime: number) {}
}

class Unit {
  constructor(
    public pos: Vec2,
    public commands: Command[],
    public isFirstUnit: boolean
  ) {}
}

const capturePoint = new CapturePoint(new Vec2(50, 50), 10)
const capturePoint2 = new CapturePoint(new Vec2(120, 50), 10)
const capturePoint3 = new CapturePoint(new Vec2(180, 70), 10)

export const gameState = {
  units: [
    new Unit(
      new Vec2(0, 0),
      [
        new Command('CAPTURE', capturePoint),
        new Command('CAPTURE', capturePoint2),
        new Command('CAPTURE', capturePoint3),
      ],
      true
    ),
    new Unit(
      new Vec2(0, 0),
      [
        new Command('CAPTURE', capturePoint),
        new Command('CAPTURE', capturePoint2),
        new Command('CAPTURE', capturePoint3),
      ],
      false
    ),
  ],
}

const $ = console.log
console.clear()

const WALKING_SPEED = 10
const SPAWN_TIME = 10

function getGameTicksFromAToB(a: Vec2, b: Vec2) {
  return a.getDistance(b) / WALKING_SPEED
}

export class TimelineNode<T> {
  constructor(
    public startTick: number,
    public endTick: number,
    public metadata: T
  ) {}
}

export class ReplayCommand {
  constructor(
    public readonly timeToTarget: number,
    public readonly timeToComplete: number,
    public readonly entity: CapturePoint,
    public unit: any
  ) {}
}

export interface IGenerate {
  generate(): any
}

class Timeline {
  private _data: TimelineNode<ReplayCommand>[] = []

  init() {
    return this.generate()
  }

  getBetween(start: number, end: number) {
    return this._data.filter((t) => t.startTick >= start && t.endTick <= end)
    // return (this._data as TimelineNode<any>[]).filter(t => {
    //   return t.startTick >= start && t.endTick <= end
    // })
  }

  private generate() {
    let currentGameTick = 0
    let lastEndTick = 0

    this._data = gameState.units
      .flatMap((u, playerIndex) => {
        const spawnTime = playerIndex * SPAWN_TIME
        currentGameTick += spawnTime

        const commands = u.commands.map((c, i, a) => {
          const distance = getGameTicksFromAToB(u.pos, c.entity.pos)
          const captureTime = c.entity.captureTime
          const toComplete =
            c.type === 'CAPTURE' ? captureTime + distance : distance

          const replayCommand = new ReplayCommand(
            distance,
            toComplete,
            c.entity,
            u
          )
          const startTick =
            i === 0 ? currentGameTick + lastEndTick : lastEndTick
          const endTick =
            currentGameTick + lastEndTick + replayCommand.timeToComplete

          const node = new TimelineNode<ReplayCommand>(
            startTick,
            endTick,
            replayCommand
          )

          lastEndTick = node.endTick

          return node
        })

        currentGameTick = playerIndex * SPAWN_TIME
        lastEndTick = 0

        return commands
      })
      .sort((a, b) => a.startTick - b.startTick)
  }

  getReplayData() {
    return this._data
  }
}
const tl = new Timeline()

tl.init()

$()
$('-------------------------------')
$()
// console.table(
//   tl.getReplayData().map((t) => ({
//     unit: t.metadata.unit,
//     start: t.startTick,
//     duration: t.metadata.timeToComplete,
//     end: t.endTick
//   }))
// );
$(tl.getBetween(0, 50))
// const actions = tl.getBetween(0, 80)
// console.log(actions)

// const tl = new Timeline();

// const timelineData = tl.generate();
// console.log(timelineData);

// $(gameState.units);

const canvas = document.createElement('canvas')

canvas.width = 800
canvas.height = 600

document.body.appendChild(canvas)

const context = canvas.getContext('2d')

let tick = 0

// function update(tick: number) {

//   console.log(tick)

//   requestAnimationFrame(update)
// }

// requestAnimationFrame((dt) => {
//   tick++
//   update(tick)
// })
