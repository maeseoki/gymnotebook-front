import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    primary: {
      50: '#fff8e6',
      100: '#ffe7bf',
      200: '#FBB021',
      300: '#F5A101',
      400: '#ff9f00',
      500: '#e68c00',
      600: '#b36a00',
      700: '#804800',
      800: '#4d2700',
      900: '#1e0700'
    },
    secondary: {
      50: '#f1f7ff',
      100: '#d5e6fd',
      200: '#acc8fa',
      300: '#84aaf7',
      400: '#5c8cf4',
      500: '#357ef1',
      600: '#2b64c2',
      700: '#214b92',
      800: '#173262',
      900: '#0c1a33'
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold'
      },
      sizes: {
        md: {
          fontSize: 'md',
          px: 4,
          py: 2
        }
      },
      variants: {
        solid: {
          bg: 'primary.300',
          color: 'white',
          _hover: {
            bg: 'primary.600'
          }
        }
      }
    }
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  }
})

export default theme
