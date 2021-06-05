export class Vec2 {
  constructor(public x: number, public y: number) {}

  getDistance(vector: Vec2) {
    const xDist = vector.x - this.x
    const yDist = vector.y - this.y

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
  }

  getDistanceFromCenter(pos: Vec2) {
    return this.getDistance(new Vec2(pos.x, pos.y))
  }
}
