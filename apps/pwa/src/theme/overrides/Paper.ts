import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Paper(_theme: Theme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  };
}
