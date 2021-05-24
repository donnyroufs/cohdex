import React from 'react'
import { Input } from '@chakra-ui/react'
import { Label } from '../../../../components'
import { IStrategiesLocalState } from '../../../../types'

export interface IStrategyTitleProps {
  state: IStrategiesLocalState
  setState: React.Dispatch<React.SetStateAction<IStrategiesLocalState>>
}

export const StrategyTitle: React.FC<IStrategyTitleProps> = ({
  state,
  setState,
}) => {
  return (
    <>
      <Label value="Title" mb={6} />
      <Input
        placeholder="strategy title"
        background="badge"
        borderColor="border"
        h={14}
        onChange={(e) =>
          setState((curr) => ({ ...curr, title: e.target.value }))
        }
        value={state.title}
        color="text.400"
        fontSize={16}
        _placeholder={{
          color: 'text.600',
          textTransform: 'capitalize',
        }}
        outline="none"
        _hover={{
          outline: 'none',
          borderColor: 'border',
        }}
        _focus={{
          outline: 'none',
          borderColor: 'border',
        }}
      />
    </>
  )
}
