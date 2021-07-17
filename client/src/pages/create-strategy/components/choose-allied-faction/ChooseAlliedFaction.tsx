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

export interface IChooseAlliedFaction {
  state: IStrategiesLocalState
  setState: React.Dispatch<React.SetStateAction<IStrategiesLocalState>>
}

export const ChooseAlliedFaction: React.FC<IChooseAlliedFaction> = ({
  state,
  setState,
}) => {
  const factions = useAppSelector((state) => state.strategies.factions)

  const alliesOptions: IFactionOptions[] = useMemo(
    () =>
      factions
        .filter((faction) => faction.team === 'ALLIES')
        .map((faction) => ({
          id: faction.id,
          imgUrl: faction.imgUrl,
          alt: faction.team as FactionTeam,
        })),
    [factions]
  )

  return (
    <>
      <Label value="Allies" mb={6} />
      <ChooseFactionMenu
        options={alliesOptions}
        onSelect={(payload: Identifier) =>
          setState((curr) => ({ ...curr, alliedFactionId: payload }))
        }
        selected={state.alliedFactionId}
      />
    </>
  )
}
