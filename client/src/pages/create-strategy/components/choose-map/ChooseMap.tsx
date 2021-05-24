import React, { useMemo } from 'react'
import Select, { NonceProvider } from 'react-select'
import { Label } from '../../../../components'
import { selectMap } from '../../../../store/slices/strategiesSlice'
import { useAppDispatch } from '../../../../store/store'
import { IStrategiesState } from '../../../../types'

const customStyles = {
  input: (provided: any) => ({
    ...provided,
    color: '#515762',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    background: '#14181D',
    color: '#838996',
    '&:hover': {
      background: '#222830',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    background: '#14181D',
    color: '#515762',
  }),
  control: (provided: any) => ({
    ...provided,
    background: '#14181D',
    borderColor: '#1F2938',
    padding: '0.6rem .2rem',
    outline: 'none',
    boxShadow: 'none',
    color: '#515762',
    '&:hover': {
      borderColor: '#1F2938',
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#515762',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#838996',
  }),
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
        placeholder="Press Any Key To Find A Map"
        noOptionsMessage={({ inputValue }) => (inputValue = 'No Maps Found')}
      />
    </>
  )
}
