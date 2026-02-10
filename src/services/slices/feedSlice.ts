import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalDay: number;
  loading: boolean;
  errors: string | null;
}

export const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalDay: 0,
  loading: false,
  errors: null
};

export const feedFetch = createAsyncThunk('feed/feedFetch', async () => {
  const response = await getFeedsApi();
  return response;
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(feedFetch.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalDay = action.payload.totalToday;
    });
  },
  selectors: {
    getStateFeed: (state) => state,
    getOrders: (state) => state.orders
  }
});

export const { getStateFeed, getOrders } =
  feedSlice.selectors;
export default feedSlice.reducer;
