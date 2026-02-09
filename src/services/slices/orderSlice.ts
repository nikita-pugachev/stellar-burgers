import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';

interface IOrderState {
  order: TOrder | null;
  count: number | null;
  loading: boolean;
  errors: string | null;
}

export const initialState: IOrderState = {
  order: null,
  count: null,
  loading: false,
  errors: null
};

export const newOrder = createAsyncThunk(
  'order/newOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response;
  }
);

export const countOrder = createAsyncThunk(
  'order/countOrder',
  async (count: number) => {
    const response = await getOrderByNumberApi(count);
    return response.orders[0];
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.errors = null;
      state.count = null;
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrder.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(newOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.count = action.payload.order.number;
      })
      .addCase(newOrder.rejected, (state, action) => {
        state.loading = false;
        state.errors =
          action.error.message || 'При оформлении заказа произошла ошибка';
      })
      .addCase(countOrder.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(countOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(countOrder.rejected, (state, action) => {
        state.loading = false;
        state.errors =
          action.error.message || 'Произошла ошибка! Попробуйте снова';
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
