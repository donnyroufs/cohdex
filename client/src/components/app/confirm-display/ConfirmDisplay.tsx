import { Button, Input, useDisclosure, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { authApi } from '../../../api'
import { confirmedDisplayName } from '../../../store/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { Modal } from '../../generic'

export const ConfirmDisplay = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)
  const [error, setError] = useState<boolean>(false)
  const [value, setValue] = useState<string>(auth.user?.displayName || '')

  const { isOpen, onClose } = useDisclosure({
    isOpen: true,
  })

  function onConfirm() {
    authApi
      .confirmDisplayName({ displayName: value?.toLocaleLowerCase() })
      .then((res) => {
        if (res.status === 204) {
          dispatch(
            confirmedDisplayName({
              displayName: value,
            })
          )

          onClose()
        }
      })
      .catch((err) => {
        // We can assume that the error is always about a duplicate display name here.
        setError(true)
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm your display name">
      <Input
        placeholder={auth.user?.displayName}
        background="badge"
        borderColor="border"
        h={14}
        onChange={(e) => setValue(e.target.value)}
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
      {error && <Text>Display name already exists, try again!</Text>}
      <Button
        mt={6}
        w="100%"
        onClick={onConfirm}
        variant="unstyled"
        mr={6}
        background="background.800"
        color="text.100"
        fontFamily="play"
        fontWeight="bold"
        _hover={{
          textDecor: 'none',
          background: 'background.700',
        }}
      >
        Confirm
      </Button>
    </Modal>
  )
}
