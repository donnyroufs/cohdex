import { Container } from '@chakra-ui/layout'
import { Welcome } from './Welcome'

function App() {
  return (
    <Container maxW="container.xl" h="100vh">
      <Welcome />
    </Container>
  )
}

export default App
