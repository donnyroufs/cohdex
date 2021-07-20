import { Box, Flex, Text, Heading, Link } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import {
  IGetAllRecentPublicStrategies,
  IRecentStrategy,
} from '../../../../../shared/dist'
import { useProviders } from '../../../hooks/useProviders'
import { Title } from '../../../components'

function isStrategyFaction(strategy: IRecentStrategy, factionId: number) {
  return strategy.Faction.id === factionId
}

export const RecentStrategies = () => {
  const [strategies, setStrategies] = useState<
    IGetAllRecentPublicStrategies['strategies']
  >([])
  const { strategyService } = useProviders()

  useEffect(() => {
    strategyService
      .getRecentPublicStrategies()
      .then((data) => {
        setStrategies(data.strategies)
      })
      .catch((err) => {
        // TODO: Handle error
        console.error(err)
      })
  }, [strategyService])

  return (
    <Flex flexDir="column">
      <Title value="Recent Strategies" mt={0} mb="30px" ml={8} />
      <Box ml={8} minW="350px">
        {strategies.map((strategy) => (
          <Link
            as={ReactLink}
            to={`strategy/${strategy.id}/${strategy.slug}`}
            textDecor="none"
            _hover={{
              textDecor: 'none',
            }}
          >
            <Box
              p={4}
              mb={2}
              bgColor="header"
              color="vintage.500"
              border="1px solid "
              borderColor="border"
              _hover={{
                transition: 'all .2s ease-in-out',
                borderColor: 'primary.500',
              }}
            >
              <Heading fontSize="xl" mb={1}>
                <Box
                  mr={2}
                  as="span"
                  color={
                    isStrategyFaction(strategy, strategy.AxisFaction.id)
                      ? 'primary.600'
                      : 'vintage.500'
                  }
                >
                  {strategy.AxisFaction.abbreviation}
                </Box>
                vs
                <Box
                  ml={2}
                  as="span"
                  mr={2}
                  color={
                    isStrategyFaction(strategy, strategy.AlliedFaction.id)
                      ? 'primary.600'
                      : 'vintage.500'
                  }
                >
                  {strategy.AlliedFaction.abbreviation}
                </Box>
                -
                <Box as="span" ml={2}>
                  {strategy.Map.name}
                </Box>
              </Heading>
              <Text textColor="primary.600" fontWeight="bold">
                @{strategy.User.displayName}
              </Text>
            </Box>
          </Link>
        ))}
      </Box>
    </Flex>
  )
}
