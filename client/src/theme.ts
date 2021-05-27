import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        background: 'background.900',
      },
    },
  },
  fonts: {
    heading: 'play',
    body: 'karla',
  },
  colors: {
    primary: {
      50: '#ffe8ec',
      100: '#f3c1c8',
      200: '#e59aa6',
      300: '#d97382',
      400: '#cd4c5e',
      500: '#b33245',
      600: '#8c2635', // !
      700: '#651a26',
      800: '#3e0e16',
      900: '#1b0107',
    },
    background: {
      50: '#eff1f5',
      100: '#d3d6dd',
      200: '#b5bac6',
      300: '#969fb1',
      400: '#78839d',
      500: '#5e6a83',
      600: '#4a5266',
      700: '#353b48',
      800: '#1f232b',
      900: '#0a0c10', // !
    },
    vintage: {
      50: '#f8f0f2',
      100: '#d9d9d9', // !
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040',
      800: '#262626',
      900: '#120b0d',
    },
    text: {
      50: '#e9f3fe',
      100: '#d3d8e1',
      200: '#b9bdc7',
      300: '#9da3ae',
      400: '#838996',
      500: '#696f7c',
      600: '#515762', // !
      700: '#3a3e47',
      800: '#21252d',
      900: '#0b0b17',
    },
    header: '#101319',
    border: '#1F2938',
    badge: '#14181D',
    table: '#13161C',
    tableStriped: '#17191F',
  },
  components: {
    Text: {
      baseStyle: {
        lineHeight: '165%',
        color: 'text.600',
      },
    },
  },
})
