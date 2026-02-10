import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

interface IUserOrderState {
  orders: TOrder[];
  loading: boolean;
  errors: string | null;
}

export const initialState: IUserOrderState = {
  orders: [],
  loading: false,
  errors: null
};

export const userOrders = createAsyncThunk('userOrder/userOrders', async () => {
  const response = await getOrdersApi();
  return response;
});

export const userOrdersSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(userOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(userOrders.rejected, (state, action) => {
        state.loading = false;
        state.errors =
          action.error.message || 'Произошла ошибка. Попробуйте снова';
      });
  },
  selectors: {
    getUserOrders: (state) => state.orders
  }
});

export const { getUserOrders } = userOrdersSlice.selectors;
export const { clearOrders } = userOrdersSlice.actions;
export default userOrdersSlice.reducer;
