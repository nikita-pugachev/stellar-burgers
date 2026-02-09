import { TUser } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie, deleteCookie } from '../../utils/cookie';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';

interface IUserState {
  user: TUser | null;
  isLogin: boolean;
  loading: boolean;
  errors: string | null;
}

export const initialState: IUserState = {
  user: null,
  isLogin: false,
  loading: false,
  errors: null
};

export const userLogin = createAsyncThunk(
  'user/userLogin',
  async (userData: { email: string; password: string }) => {
    const response = await loginUserApi(userData);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const userRegistration = createAsyncThunk(
  'user/userRegistration',
  async (userData: { email: string; password: string; name: string }) => {
    const response = await registerUserApi(userData);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const userEdit = createAsyncThunk(
  'user/userEdit',
  async (userData: { email: string; password?: string; name: string }) => {
    const response = await updateUserApi(userData);
    return response;
  }
);

export const userInfo = createAsyncThunk('user/userInfo', async () => {
  const response = await getUserApi();
  return response;
});

export const userLogout = createAsyncThunk('user/userLogout', async () => {
  const response = await logoutApi();

  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');

  return response;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isLogin = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error.message || 'Ошибка входа в аккаунт';
      })
      .addCase(userRegistration.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isLogin = true;
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.loading = false;
        state.errors =
          action.error.message || 'Ошибка! Регистрация не завершена';
      })
      .addCase(userEdit.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLogin = true;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLogin = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.user = null;
        state.isLogin = false;
      });
  }
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
