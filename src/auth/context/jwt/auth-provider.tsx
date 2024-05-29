import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------
const ACCESS_STORAGE_KEY = 'accessToken';
const REFRESH_STORAGE_KEY = 'refreshToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(ACCESS_STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const res = await axios.get(endpoints.auth.me);

        const { user } = res.data.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const data = {
      email,
      password,
    };

    const res = await axios.post(endpoints.auth.login, data);

    const { tokens, user } = res.data.data;

    const { accessToken, refreshToken } = tokens;
    setSession(accessToken, refreshToken);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken,
        },
      },
    });
    sessionStorage.setItem(REFRESH_STORAGE_KEY, refreshToken);
  }, []);

  // REGISTER
  const register = useCallback(async (email: string, password: string, firstName: string) => {
    const data = {
      email,
      password,
      firstName,
    };

    const res = await axios.post(endpoints.auth.register, data);

    const { tokens, user } = res.data.data;
    const { accessToken, refreshToken } = tokens;
    sessionStorage.setItem(ACCESS_STORAGE_KEY, accessToken);
    sessionStorage.setItem(REFRESH_STORAGE_KEY, refreshToken);

    dispatch({
      type: Types.REGISTER,
      payload: {
        user: {
          ...user,
          accessToken,
          refreshToken,
        },
      },
    });
  }, []);
  // VERIFY
  const confirmRegister = useCallback(async (email: string, code: string) => {
    const data = {
      email,
      code,
    };

    const res = await axios.post(endpoints.auth.verify, data);
    const { tokens, user } = res.data.data;
    const { accessToken, refreshToken } = tokens;
    sessionStorage.setItem(ACCESS_STORAGE_KEY, accessToken);
    sessionStorage.setItem(REFRESH_STORAGE_KEY, refreshToken);

    dispatch({
      type: Types.REGISTER,
      payload: {
        user: {
          ...user,
          accessToken,
          refreshToken,
        },
      },
    });
  }, []);
  // RENEDCODE
  const resendCodeRegister = useCallback(async (email: string) => {
    const data = {
      email,
    };
    const res = await axios.post(endpoints.auth.resend, data);
    const { tokens, user } = res.data.data;
    const { accessToken, refreshToken } = tokens;
    sessionStorage.setItem(ACCESS_STORAGE_KEY, accessToken);
    sessionStorage.setItem(REFRESH_STORAGE_KEY, refreshToken);
  }, []);
  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
      confirmRegister,
      resendCodeRegister,
    }),
    [login, logout, register, state.user, status, resendCodeRegister, confirmRegister]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
