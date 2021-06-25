import { useState, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { HexColorPicker } from 'react-colorful'
import { useDebouncyEffect } from 'use-debouncy'
import { useOutsideClick } from '@chakra-ui/react'

export interface IUnitColourPickerProps {
  id: number
  colour: string
  onChange: React.Dispatch<React.SetStateAction<string>>
  updateLocalUnitColour(id: number, colour: string): void
}

export const UnitColourPicker: React.FC<IUnitColourPickerProps> = ({
  colour: currentColour,
  onChange,
  updateLocalUnitColour,
  id,
}) => {
  const [value, setValue] = useState(currentColour)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<any>()
  useDebouncyEffect(() => onChange(value), 600, [value])

  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen(false),
  })

  return (
    <>
      <Box
        position="absolute"
        bottom={6}
        right={1}
        borderRadius="100%"
        borderColor="#1F2938"
        border="4px solid"
        zIndex="20"
        height={6}
        background={value}
        width={6}
        onClick={() => {
          setIsOpen((curr) => !curr)
        }}
        _hover={{
          borderColor: '#ceeff1',
          cursor: 'pointer',
        }}
      ></Box>

      {isOpen && (
        <Box position="absolute" left="90px" zIndex="50" ref={ref}>
          <HexColorPicker
            onChange={(e) => {
              setValue(e.toString())
              updateLocalUnitColour(id, e.toString())
            }}
            color={value}
          />
        </Box>
      )}
    </>
  )
}
