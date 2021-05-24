import React, { useMemo } from 'react'
import { ChooseFactionMenu } from '..'
import { Label } from '../../../../components'
import { selectAxisFaction } from '../../../../store/slices/strategiesSlice'
import { useAppDispatch } from '../../../../store/store'
import {
  FactionTeam,
  Identifier,
  IFactionOptions,
  IStrategiesState,
} from '../../../../types'

export interface IChooseAxisFactionProps {
  strategies: IStrategiesState
}

export const ChooseAxisFaction: React.FC<IChooseAxisFactionProps> = ({
  strategies,
}) => {
  const dispatch = useAppDispatch()

  const axisOptions: IFactionOptions[] = useMemo(
    () =>
      strategies.factions
        .filter((faction) => faction.team === 'AXIS')
        .map((faction) => ({
          id: faction.id,
          imgUrl: faction.imgUrl,
          alt: faction.team as FactionTeam,
        })),
    [strategies.factions]
  )

  return (
    <>
      <Label value="Axis" mb={6} />
      <ChooseFactionMenu
        options={axisOptions}
        onSelect={(payload: Identifier) => dispatch(selectAxisFaction(payload))}
        selected={strategies.axisFactionId}
      />
    </>
  )
}
