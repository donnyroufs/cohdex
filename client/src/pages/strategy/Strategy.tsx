import { useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { BaseLayout } from '../../components/layouts'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { fetchStrategy } from '../../store/slices/strategiesSlice'
import { TacticalMap } from './logic/tactical-map'

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
      const tmap = new TacticalMap({
        strategy,
        rendererOptions: {
          canvas: ref.current!,
          height: 840,
          width: 840,
        },
      })

      tmap.start()
    }
  }, [status, strategy, slug])

  return (
    <BaseLayout.Container>
      <canvas ref={ref}></canvas>
    </BaseLayout.Container>
  )
}
