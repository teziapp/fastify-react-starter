  import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function PageOne() {

  return (
    <>
      <Helmet>
        <title> Page One | fastfy-react-starter</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h3" component="h1" paragraph>
          TODO:
        </Typography>

        <Typography gutterBottom>
          - make the side bar collapsible on hover like smartagent<br />
          - update the logo everywhere where it is used from animation to everywhere<br />
          - create the basic Dashboard with all kinds of widgets of anyaltics<br />
          - demo of material react table<br />
          - implment the normal login flow and store the info in user table, also new user registration page<br />
          - remove the contrast and rtl and color theme thing from theme settings<br />
          - making the common db package and changing orchid orm to typeorm
        </Typography>

        <Typography>
          
        </Typography>
      </Container>
    </>
  );
}
