import { Flex, Image } from '@chakra-ui/react'
import { useAppSelector } from '../../../../../store/store'

export const Avatar: React.FC = () => {
  const src = useAppSelector((state) => state.auth.user?.avatar)

  return (
    <Flex alignItems="center" justifyContent="center" h="4rem" w="4rem">
      {src && <Image w="64px" src={src} borderRadius="50%"></Image>}
    </Flex>
  )
}
