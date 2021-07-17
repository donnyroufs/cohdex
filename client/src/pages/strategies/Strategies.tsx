import { Box, Flex, Text, Link as ChakraLink } from '@chakra-ui/react'
import { Skeleton } from '@chakra-ui/skeleton'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Title } from '../../components'
import { BaseLayout } from '../../components/layouts'
import { fetchUserSrategies } from '../../store/slices/strategiesSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Table } from './components'

export const Strategies = () => {
  const dispatch = useAppDispatch()
  const strategies = useAppSelector((state) => state.strategies.strategies)
  const user = useAppSelector((state) => state.auth.user)
  const status = useAppSelector((state) => state.strategies.status)

  useEffect(() => {
    dispatch(fetchUserSrategies())
  }, [dispatch])

  return (
    <BaseLayout.Container>
      <Flex>
        <Box flex="5" userSelect="none">
          <Title value="Your Strategies" ml={0} mt={0} mb={8} />
          <Box
            display={{ base: 'flex', md: 'none' }}
            bgColor="table"
            p={6}
            border="1px solid"
            borderColor="primary.700"
          >
            <Text color="vintage.500">Mobile is not supported.</Text>
          </Box>
          {!user && (
            <Box
              bgColor="table"
              p={6}
              border="1px solid"
              borderColor="primary.700"
            >
              <Text color="vintage.500">
                We are currently in beta therefore you cannot see posts by
                others on this page. If you want too you can ask others to share
                the url of their strategy!
              </Text>
            </Box>
          )}
          {user && (
            <Skeleton
              isLoaded={status === 'idle'}
              minH="500px"
              startColor="background.700"
              endColor="background.800"
            >
              {strategies.length <= 0 && (
                <Box
                  bgColor="table"
                  p={6}
                  border="1px solid"
                  borderColor="primary.700"
                >
                  <Text color="vintage.500">
                    You have no strategies.
                    <ChakraLink
                      as={Link}
                      ml={2}
                      to="/strategies/create"
                      fontWeight="bold"
                      color="primary.600"
                    >
                      Create your first!
                    </ChakraLink>
                  </Text>
                </Box>
              )}
              {strategies.length > 0 && (
                <Table
                  tableData={strategies
                    .map((strategy) => ({
                      id: strategy.id,
                      slug: strategy.slug,
                      title: strategy.title,
                      you: strategy.Faction.name,
                      visibility: strategy.visibility,
                      opponent:
                        strategy.AlliedFaction.name === strategy.Faction.name
                          ? strategy.AxisFaction.name
                          : strategy.AlliedFaction.name,
                      mapName: strategy.Map.name,
                      // TODO: Not implemented yet.
                      spawn: strategy.spawnPoint
                        ? String(strategy.spawnPoint)
                        : 'Not picked yet',
                    }))
                    .sort((a, b) => b.id - a.id)} // For now we dont need to look at dates
                />
              )}
            </Skeleton>
          )}
        </Box>
      </Flex>
    </BaseLayout.Container>
  )
}
