import React, { useMemo } from 'react'
import { ChooseFactionMenu } from '..'
import { Label } from '../../../../components'
import { selectAlliesFaction } from '../../../../store/slices/strategiesSlice'
import { useAppDispatch } from '../../../../store/store'
import {
  FactionTeam,
  Identifier,
  IFactionOptions,
  IStrategiesState,
} from '../../../../types'

export interface IChooseAlliesFactionProps {
  strategies: IStrategiesState
}

export const ChooseAlliesFaction: React.FC<IChooseAlliesFactionProps> = ({
  strategies,
}) => {
  const dispatch = useAppDispatch()

  const alliesOptions: IFactionOptions[] = useMemo(
    () =>
      strategies.factions
        .filter((faction) => faction.team === 'ALLIES')
        .map((faction) => ({
          id: faction.id,
          imgUrl: faction.imgUrl,
          alt: faction.team as FactionTeam,
        })),
    [strategies.factions]
  )
  return (
    <>
      <Label value="Allies" mb={6} />
      <ChooseFactionMenu
        options={alliesOptions}
        onSelect={(payload: Identifier) =>
          dispatch(selectAlliesFaction(payload))
        }
        selected={strategies.axisFactionId}
      />
    </>
  )
}
