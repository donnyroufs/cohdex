import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { FaSignOutAlt, FaPlus, FaHome, FaCog } from 'react-icons/fa'
import { useHistory } from 'react-router'
import { logout } from '../../../../../store/slices/authSlice'
import { useAppDispatch } from '../../../../../store/store'

import { Avatar } from './Avatar'

export const Dropdown = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  function onStrategies() {
    history.push('/strategies')
  }

  function onCreateStrategy() {
    history.push('/strategies/create')
  }

  function onSettings() {
    history.push('/settings')
  }

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
      <MenuList border="none" backgroundColor="background.800" py={2} mt={4}>
        <MenuItem
          backgroundColor="background.800"
          icon={<FaHome />}
          onClick={onStrategies}
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
          Strategies
        </MenuItem>
        <MenuItem
          backgroundColor="background.800"
          icon={<FaPlus />}
          onClick={onCreateStrategy}
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
          Create Strategy
        </MenuItem>
        <MenuItem
          backgroundColor="background.800"
          icon={<FaCog />}
          onClick={onSettings}
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
          Settings
        </MenuItem>
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
