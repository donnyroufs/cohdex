export function singleCoordinateToScreen(coordinate: number, scale: number) {
  return 350 - coordinate * scale
}
