import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

interface IIngredientState {
  ingredients: TIngredient[];
  loading: boolean;
  errors: string | null | undefined;
}

export const initialState: IIngredientState = {
  ingredients: [],
  loading: false,
  errors: null
};

export const ingredientFetch = createAsyncThunk(
  'imgredient/ingredientFetch',
  async () => await getIngredientsApi()
);

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ingredientFetch.pending, (state) => {
        state.loading = true;
      })
      .addCase(ingredientFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(ingredientFetch.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error.message;
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getLoading: (state) => state.loading
  }
});

export const { getIngredients, getLoading } = ingredientSlice.selectors;
export default ingredientSlice.reducer;
