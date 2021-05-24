import React, { useMemo } from 'react'
import Select from 'react-select'
import { Label } from '../../../../components'
import { selectMap } from '../../../../store/slices/strategiesSlice'
import { useAppDispatch } from '../../../../store/store'
import { IStrategiesState } from '../../../../types'

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    // color: state.isSelected ? 'red' : 'blue',
    // padding: 20,
  }),
  menu: (provided: any, state: any) => ({}),
  control: (provided: any) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    background: '#14181D',
    borderColor: '#1F2938',
    padding: '0.6rem .2rem',
  }),
  // singleValue: (provided: any, state: any) => {
  //   const opacity = state.isDisabled ? 0.5 : 1
  //   const transition = 'opacity 300ms'

  //   return { ...provided, opacity, transition }
  // },
}

export interface IChooseMapProps {
  strategies: IStrategiesState
}

export const ChooseMap: React.FC<IChooseMapProps> = ({ strategies }) => {
  const dispatch = useAppDispatch()

  const chooseMapOptions = useMemo(
    () =>
      strategies.maps.map((m) => ({
        value: m.id,
        label: m.name,
      })),
    [strategies.maps]
  )

  return (
    <>
      <Label value="Choose map" mb={6} />
      <Select
        options={chooseMapOptions}
        styles={customStyles}
        onChange={(e) => dispatch(selectMap(e!.value))}
      />
    </>
  )
}
