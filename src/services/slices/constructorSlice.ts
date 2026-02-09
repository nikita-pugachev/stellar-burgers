import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface IConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  total: number;
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: [],
  total: 0
};

const price = (
  bun: TConstructorIngredient | null,
  ingredients: TConstructorIngredient[]
) => {
  const priceBun = bun ? bun.price * 2 : 0;
  const priceIngredients = ingredients.reduce(
    (total, ingredient) => total + ingredient.price,
    0
  );
  const totalPrice = priceBun + priceIngredients;

  return totalPrice;
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
        state.total = price(state.bun, state.ingredients);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item._id !== action.payload
      );
      state.total = price(state.bun, state.ingredients);
    },
    moveIngredients: (
      state,
      action: PayloadAction<{ oldPosition: number; newPosition: number }>
    ) => {
      const ingredients = [...state.ingredients];
      const { oldPosition, newPosition } = action.payload;
      const [moveIngredient] = ingredients.splice(oldPosition, 1);
      ingredients.splice(newPosition, 0, moveIngredient);
      state.ingredients = ingredients;
    },
    clearIngredients: () => initialState
  }
});

export const {
  addIngredients,
  removeIngredient,
  moveIngredients,
  clearIngredients
} = constructorSlice.actions;

export default constructorSlice.reducer;
