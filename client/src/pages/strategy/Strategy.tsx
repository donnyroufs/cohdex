import { useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { BaseLayout } from '../../components/layouts'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { fetchStrategy } from '../../store/slices/strategiesSlice'

export interface IStrategyParams {
  slug: string
}

export const Strategy = () => {
  const { slug } = useParams<IStrategyParams>()
  const ref = useRef<HTMLCanvasElement | null>(null)
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.strategy.status)
  const strategy = useAppSelector((state) => state.strategy.data)

  useEffect(() => {
    dispatch(fetchStrategy(slug))
  }, [dispatch, slug])

  useEffect(() => {
    if (ref.current && status === 'idle') {
      const canvas = ref.current
      const ctx = canvas.getContext('2d')!
      const { height, width, url } = strategy.Map

      const img = new Image()
      img.src = url

      const scaleX = canvas.width / width
      const scaleY = canvas.height / height

      const CANVAS_HEIGHT = height * scaleY
      const CANVAS_WIDTH = width * scaleX

      img.onload = () => {
        ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        let spawn = 0
        let spawnIconName: string

        const points = strategy.Map.pointPositions
        points.forEach((point) => {
          const isSpawnPoint = point.fileName.includes('starting')

          if (isSpawnPoint) {
            spawn++
          }

          spawnIconName = point.fileName

          if (spawn > 1) {
            spawnIconName = point.fileName + '-2'
          }

          const x = point.x * scaleX
          const y = point.y * scaleY

          const SIZE = 25 * scaleX

          const CENTER = CANVAS_HEIGHT / 2 - SIZE / 2

          const flip = (pos: number) => (pos < 0 ? Math.abs(pos) : 0 - pos)

          const _img = new Image()
          _img.src = `${process.env.REACT_APP_BASE_URL}/public/${
            isSpawnPoint ? spawnIconName : point.fileName
          }.png`
          _img.onload = () => {
            ctx.drawImage(_img, x + CENTER, flip(y) + CENTER, SIZE, SIZE)
          }
        })
      }
    }
  }, [status, strategy])

  return (
    <BaseLayout.Container>
      <canvas height="640" width="640" ref={ref}></canvas>
    </BaseLayout.Container>
  )
}

export class Vec2 {
  constructor(public x: number, public y: number) {}
}
