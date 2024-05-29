import { Helmet } from 'react-helmet-async';

import AmplifyVerifyView from 'src/sections/auth/jwt/jwt-verify-view';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Jwt: Verify</title>
      </Helmet>

      <AmplifyVerifyView />
    </>
  );
}
