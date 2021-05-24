import React, { useMemo } from 'react'
import Select from 'react-select'
import { Label } from '../../../../components'
import { useAppSelector } from '../../../../store/store'
import { IStrategiesLocalState } from '../../../../types'

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
  control: (provided: any, state: any) => ({
    ...provided,
    background: '#14181D',
    borderColor: '#1F2938',
    padding: '0.6rem .2rem',
    // outline: 'none',
    boxShadow: state.isFocused ? '0 0 0 1px #B33245' : 'none',
    color: '#515762',
    '&:hover': {
      borderColor: '#1F2938',
      cursor: 'pointer',
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
  indicatorSeparator: () => ({}),
}

export interface IChooseMapProps {
  state: IStrategiesLocalState
  setState: React.Dispatch<React.SetStateAction<IStrategiesLocalState>>
}

export const ChooseMap: React.FC<IChooseMapProps> = ({ state, setState }) => {
  const maps = useAppSelector((state) => state.strategies.maps)

  const chooseMapOptions = useMemo(
    () =>
      maps.map((m) => ({
        value: m.id,
        label: m.name,
      })),
    [maps]
  )

  const chosenMap = useMemo(
    () => maps.find((map) => map.id === state.mapId),
    [maps, state]
  )

  return (
    <>
      <Label value="Choose map" mb={6} />
      <Select
        options={chooseMapOptions}
        styles={customStyles}
        onChange={(e) => {
          if (e?.value) {
            setState((curr) => ({ ...curr, mapId: e.value }))
          }
        }}
        placeholder={chosenMap ? chosenMap.name : 'Press Any Key To Find A Map'}
        noOptionsMessage={({ inputValue }) => (inputValue = 'No Maps Found')}
      />
    </>
  )
}
