import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // Black
      main: '#000',
    },
    // for is open we can use the (info) color, and (error) for close
    // https://mui.com/system/palette/#main-content
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

export default theme;
