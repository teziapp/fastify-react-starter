// @mui
import {
  Alert,
  Box,
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// layouts
import LoginLayout from "../../layouts/login";
//
import { AuthWithSocial } from "./AuthWithSocial";

// ----------------------------------------------------------------------

export const Login = () => {
  return (
    <LoginLayout title="Login">
      <Stack spacing={2} sx={{ mb: 5 }}>
        <Typography variant="h4">Sign in to Fastify-React-Starter</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>
          <Link variant="subtitle2">Create an account</Link>
        </Stack>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        This is Sample Alert
      </Alert>
      <Card
        sx={{
          p: 3,
          mb: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ width: "100%" }}>
          Login with Email
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          defaultValue="demo@gmail.com"
          size="small"
          sx={{ width: "100%" }}
        />
        <TextField
          label="Password"
          size="small"
          defaultValue="demodemodemo"
          type="password"
          sx={{ width: "100%" }}
        />
        <Stack
          direction="column"
          justifyContent="end"
          alignItems="end"
          sx={{ width: "100%", gap: 2 }}
        >
          <Box
            component="span"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Link variant="caption">Reset password</Link>
          </Box>
          <Box component="span" sx={{ width: "100%" }}>
            <Button variant="contained" sx={{ width: "100%" }}>
              Login
            </Button>
          </Box>
        </Stack>
      </Card>
      <AuthWithSocial />
    </LoginLayout>
  );
};
