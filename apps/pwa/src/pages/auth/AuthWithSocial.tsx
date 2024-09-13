// @mui
import { Divider, IconButton, Stack } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
import Iconify from '@/component/iconify';
// components

// ----------------------------------------------------------------------

export default function AuthWithSocial() {
  const { login } = useAuthContext();

  const handleGoogleLogin = async () => {
    try {
      if (login) {
        login();
      }
      console.log('GOOGLE LOGIN');
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: 'overline',
          color: 'text.disabled',
          '&::before, ::after': {
            borderTopStyle: 'dashed',
          },
        }}
      >
        OR
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton onClick={handleGoogleLogin}>
          <Iconify icon="eva:google-fill" color="#DF3E30" />
        </IconButton>

      </Stack>
    </div>
  );
}
