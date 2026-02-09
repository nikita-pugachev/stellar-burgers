import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

interface IIngredientState {
  ingredients: TIngredient[];
  loading: boolean;
  errors: string | null;
}

export const initialState: IIngredientState = {
  ingredients: [],
  loading: false,
  errors: null
};

export const ingredientFetch = createAsyncThunk(
  'ingredients/ingredientFetch',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ingredientFetch.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(ingredientFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(ingredientFetch.rejected, (state, action) => {
        state.loading = false;
        state.errors =
          action.error.message ||
          'Ошибка при загрузке списка ингредиентов, попробуйте снова.';
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getLoading: (state) => state.loading
  }
});

export const { getIngredients, getLoading } = ingredientSlice.selectors;
export default ingredientSlice.reducer;
