import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

// export const tokenExpired = (exp: number) => {
//   let expiredTimer;

//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;

//   clearTimeout(expiredTimer);

//   expiredTimer = setTimeout(async () => {
//     try {
//       // Send refresh request
//       // const refresh_token = sessionStorage.getItem('refreshToken');
//       // if (refresh_token) {
//       //   const response = await axios.post('/api/v1/auth/refresh/', {
//       //     refresh: refresh_token,
//       //   });

//         // Assuming the new access token is returned in the response
//         // const newAccessToken = response.data.access;

//         // Update the access token in the session storage and axios headers
//         sessionStorage.setItem('access', newAccessToken);
//         axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

//         // Decode the new access token to get its expiry time
//         const decodedNewToken = jwtDecode(newAccessToken);
//         const { exp: newExp } = decodedNewToken;

//         // Call tokenExpired again with the expiry time of the new token
//         tokenExpired(newExp);
//       } else {
//         // Handle refresh token not available
//         console.error('Refresh token not available');
//       }
//     } catch (error) {
//       console.error('Failed to refresh token:', error);
//       // Handle refresh token failure, maybe redirect to login page
//     }
//   }, timeLeft);
// };

export const setSession = (accessToken: string | null, refreshToken?: string | null) => {
  if (accessToken) {
    sessionStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // Store refresh token
    if (refreshToken) {
      sessionStorage.setItem('refreshToken', refreshToken);
    }

    // Decode the access token to get its expiry time
    const decodedToken = jwtDecode(accessToken);
    const { exp } = decodedToken;
  } else {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};
