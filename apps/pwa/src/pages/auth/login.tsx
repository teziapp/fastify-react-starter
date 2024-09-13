// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthWithSocial from './AuthWithSocial';

// ----------------------------------------------------------------------

export default function Login() {

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in to Fastify-React-Starter</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link variant="subtitle2">Create an account</Link>
        </Stack>

        <Tooltip title={"Login with Google"} placement="left">
          <Box
            component="img"
            alt={"Login with Google"}
            src={`/assets/icons/auth/ic_jwt.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        This is Sample Alert
      </Alert>

      {/* <AuthLoginForm /> */}

      <AuthWithSocial />
    </LoginLayout>
  );
}
