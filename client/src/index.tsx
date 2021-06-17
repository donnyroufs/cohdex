import '@fontsource/karla'
import '@fontsource/play'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { theme } from './theme'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { AppProvider } from './provider/AppProvider'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <App />
        </ChakraProvider>
      </Provider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
