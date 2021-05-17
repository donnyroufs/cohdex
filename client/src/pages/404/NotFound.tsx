import { BaseLayout } from '../../components/layouts'
import { Box, Heading, Link } from '@chakra-ui/react'

export const NotFound = () => {
  return (
    <BaseLayout>
      <Box
        textAlign="center"
        h="calc(100vh - 128px)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box
          alt="coh2 wallpaper"
          background="radial-gradient(50.26% 61.11% at 50% 25%, rgba(15, 18, 24, 0) 0%, #0a0c10 100%), url(404.png)"
          bgRepeat="repeat-x"
          opacity="0.65"
          width={{ lg: '960px', xl: '1280px' }}
          height={{ lg: '500px', xl: '720px' }}
        ></Box>
        <Heading color="primary.600">
          An infantry squad has made the ultimate sacrifice, death before
          retreat
        </Heading>
      </Box>
    </BaseLayout>
  )
}
