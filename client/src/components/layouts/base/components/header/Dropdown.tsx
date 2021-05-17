import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa'
import { logout } from '../../../../../store/slices/authSlice'
import { useAppDispatch } from '../../../../../store/store'

import { Avatar } from './Avatar'

export const Dropdown = () => {
  const dispatch = useAppDispatch()

  function onLogout() {
    dispatch(logout())
  }

  return (
    <Menu closeOnBlur>
      <MenuButton
        background="none"
        as={IconButton}
        aria-label="Options"
        icon={<Avatar />}
        fontSize="lg"
        _hover={{
          background: 'none',
        }}
        _active={{
          background: 'none',
        }}
        _focus={{
          background: 'none',
        }}
      />
      <MenuList border="none" backgroundColor="background.800" py={2}>
        <MenuItem
          backgroundColor="background.800"
          icon={<FaSignOutAlt />}
          onClick={onLogout}
          _hover={{
            background: 'background.700',
          }}
          _active={{
            background: 'none',
          }}
          _focus={{
            background: 'none',
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
