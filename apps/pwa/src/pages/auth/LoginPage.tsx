import Login from '@/pages/auth/login';
import { Helmet } from 'react-helmet-async';
// sections

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Fastify-React-Starter</title>
      </Helmet>

      <Login />
    </>
  );
}
