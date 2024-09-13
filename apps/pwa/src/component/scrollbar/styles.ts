import SimpleBar from 'simplebar-react';
import { ComponentType } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledRootScrollbar: ComponentType<any> = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
}));

export const StyledScrollbar: ComponentType<any> = styled(SimpleBar)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10,
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}));
