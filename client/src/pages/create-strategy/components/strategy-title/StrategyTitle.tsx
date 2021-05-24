import React from 'react'
import { Input } from '@chakra-ui/react'
import { Label } from '../../../../components'
import { setTitle } from '../../../../store/slices/strategiesSlice'
import { useAppDispatch } from '../../../../store/store'
import { IStrategiesState } from '../../../../types'

export interface IStrategyTitleProps {
  strategies: IStrategiesState
}

export const StrategyTitle: React.FC<IStrategyTitleProps> = ({
  strategies,
}) => {
  const dispatch = useAppDispatch()

  return (
    <>
      <Label value="Title" mb={6} />
      <Input
        placeholder="strategy title"
        background="badge"
        borderColor="border"
        h={14}
        onChange={(e) => dispatch(setTitle(e.target.value))}
        value={strategies.title}
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
