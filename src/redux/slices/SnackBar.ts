/* eslint-disable consistent-return */
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  key: string;
  dismissed?: boolean;
}

interface EnqueueSnackbarPayload {
  notification: Omit<Notification, 'key'> & { options?: { key?: string } };
}

interface CloseSnackbarPayload {
  dismissAll: boolean;
  key?: string;
}

interface RemoveSnackbarPayload {
  key: string;
}

interface NotifierState {
  notifications: Notification[];
}

const initialState: NotifierState = {
  notifications: [],
};

const SnackbarReducer = createSlice({
  name: 'notifier',
  initialState,
  reducers: {
    addNotif: (state, action: PayloadAction<EnqueueSnackbarPayload>) => {
      state.notifications = [
        ...state.notifications,
        {
          key:
            action.payload.notification.options?.key ||
            (new Date().getTime() + Math.random()).toString(),
          ...action.payload.notification,
        },
      ];
    },
    closeNotif: (state, action: PayloadAction<CloseSnackbarPayload>) => {
      state.notifications = state.notifications.map((notification) =>
        action.payload.dismissAll || notification.key === action.payload.key
          ? { ...notification, dismissed: true }
          : { ...notification }
      );
    },
    removeNotif: (state, action: PayloadAction<RemoveSnackbarPayload>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.key !== action.payload.key
      );
    },
  },
});

export const reducers = SnackbarReducer.reducer;

// eslint-disable-next-line consistent-return
export const enqueueSnackbar = (notification: EnqueueSnackbarPayload) => (dispatch: Dispatch) => {
  const key = notification.notification.options?.key;
  try {
    const res: EnqueueSnackbarPayload = {
      notification: {
        ...notification.notification,
        options: {
          key: key || (new Date().getTime() + Math.random()).toString(),
        },
      },
    };
    dispatch(SnackbarReducer.actions.addNotif(res));
  } catch (e) {
    return console.error(e.message);
  }
};
export const closeSnackbar = (key?: string) => (dispatch: Dispatch) => {
  try {
    const res: CloseSnackbarPayload = {
      dismissAll: !key,
      key,
    };
    dispatch(SnackbarReducer.actions.closeNotif(res));
  } catch (e) {
    return console.error(e.message);
  }
};

export const removeSnackbar = (key: string) => (dispatch: Dispatch) => {
  try {
    const res: RemoveSnackbarPayload = {
      key,
    };
    dispatch(SnackbarReducer.actions.removeNotif(res));
  } catch (e) {
    return console.error(e.message);
  }
};

export default SnackbarReducer;
