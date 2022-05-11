import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      text: '#fff',
      background: '#000',
      primary: '#0fc',
      secondary: '#0cf',
      highlight: '#f0c',
      muted: '#011',
    },
  },
});

export default theme;
