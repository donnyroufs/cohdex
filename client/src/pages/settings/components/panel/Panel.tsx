import { Box, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { Label } from '../../../../components'
import { useAppSelector } from '../../../../store/store'

export interface IPanelProps {
  placeholderValue: string
}

export const Panel: React.FC<IPanelProps> = ({ placeholderValue }) => {
  const user = useAppSelector((state) => state.auth.user)

  const [value, setValue] = useState(user?.displayName)

  return (
    <Box
      bgColor="bg.300"
      border="2px solid"
      borderColor="border"
      p={14}
      mt={12}
    >
      <Label value="displayName" mb={6} my={0} />
      <Input
        disabled={true}
        _disabled={{ opacity: 1 }}
        placeholder={placeholderValue}
        background="badge"
        borderColor="border"
        h={14}
        onChange={(e) => setValue(e.target.value.toLowerCase())}
        value={value}
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
          outline: 'primary.600',
          borderColor: 'primary.600',
        }}
      />
    </Box>
  )
}
