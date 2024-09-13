import { Theme } from '@mui/material/styles';
//
import { InputSelectIcon } from './CustomIcons';

// ----------------------------------------------------------------------

export default function Select(_theme: Theme) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: InputSelectIcon,
      },
    },
  };
}
