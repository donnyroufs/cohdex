import { Grid, Image, useOutsideClick } from '@chakra-ui/react'
import { IUnit } from '@cohdex/shared'
import { useRef } from 'react'

export interface ISelectUnitProps {
  units?: IUnit[]
  handleOnAdd(id: number): void
  handleClose(e: Event): void
}

export const SelectUnit: React.FC<ISelectUnitProps> = ({
  units,
  handleOnAdd,
  handleClose,
}) => {
  const ref = useRef<any>()

  useOutsideClick({
    ref: ref,
    handler: (e: Event) => handleClose(e),
  })

  return (
    <Grid
      ref={ref}
      bgColor="background.900"
      templateColumns="repeat(3, 1fr)"
      position="absolute"
      top={0}
      left="90px"
      w={275}
      zIndex={50}
      placeItems="center"
      p={2}
      pt={6}
      columnGap={4}
      border="1px solid"
      borderColor="border"
    >
      {units?.map((u) => (
        <Image
          onClick={() => handleOnAdd(u.id)}
          key={u.id}
          mb={4}
          h="84px"
          w="74px"
          bgColor="background.800"
          border="2px solid transparent"
          // borderColor={activeUnit?.id === id ? 'primary.600' : 'border'}
          src={process.env.REACT_APP_BASE_URL + '/public' + u.image}
          alt="unit portrait"
          // opacity={activeUnit?.id === id ? 1 : 0.7}
          transition="all .15s ease-in-out"
          _hover={{
            cursor: 'pointer',
            opacity: 1,
            borderColor: 'primary.600',
          }}
        />
      ))}
    </Grid>
  )
}
