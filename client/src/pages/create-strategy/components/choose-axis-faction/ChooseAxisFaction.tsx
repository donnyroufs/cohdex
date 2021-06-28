import React, { useMemo } from 'react'
import { ChooseFactionMenu } from '..'
import { Label } from '../../../../components'
import { useAppSelector } from '../../../../store/store'
import {
  FactionTeam,
  Identifier,
  IFactionOptions,
  IStrategiesLocalState,
} from '../../../../types'

export interface IChooseAxisFactionProps {
  state: IStrategiesLocalState
  setState: React.Dispatch<React.SetStateAction<IStrategiesLocalState>>
}

export const ChooseAxisFaction: React.FC<IChooseAxisFactionProps> = ({
  state,
  setState,
}) => {
  const factions = useAppSelector((state) => state.strategies.factions)

  const axisOptions: IFactionOptions[] = useMemo(
    () =>
      factions
        .filter((faction) => faction.team === 'AXIS')
        .map((faction) => ({
          id: faction.id,
          imgUrl: faction.imgUrl,
          alt: faction.team as FactionTeam,
        })),
    [factions]
  )

  return (
    <>
      <Label value="Axis" mb={6} />
      <ChooseFactionMenu
        options={axisOptions}
        onSelect={(payload: Identifier) =>
          setState((curr) => ({ ...curr, axisFactionId: payload }))
        }
        selected={state.axisFactionId}
      />
    </>
  )
}
