import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { theme } from './theme'
import { store } from './store/store'
import { Provider } from 'react-redux'

import '@fontsource/karla'
import '@fontsource/play'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
