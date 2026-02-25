import { error } from 'console';
import {
  getStateIngredients,
  getIngredients,
  ingredientFetch,
  ingredientSlice
} from './ingredientSlice';

export const initialState = {
  ingredients: [],
  loading: false,
  errors: null
};

const mokedDataFetch = {
  success: true,
  data: [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ]
};

describe('Тестирование ингредиентов', () => {
  it('Тест редьюсера на получение данных ингредиентов в процессе загрузки', () => {
    const state = ingredientSlice.reducer(initialState, {
      type: ingredientFetch.pending.type
    });
    expect(state.loading).toBe(true);
    expect(state.errors).toBeNull();
  });

  it('Тест редьюсера на получение данных ингредиентов при успешной загрузке', () => {
    const state = ingredientSlice.reducer(initialState, {
      type: ingredientFetch.fulfilled.type,
      payload: mokedDataFetch.data
    });
    expect(state.ingredients).toEqual(mokedDataFetch.data);
    expect(state.loading).toBe(false);
  });

  it('Тест редьюсера на получение данных ингредиентов при ошибке загрузки', () => {
    const action = {
      type: ingredientFetch.rejected.type,
      error: { message: 'Ошибка при загрузке списка ингредиентов, попробуйте снова.' }
    };
    const state = ingredientSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.errors).toBe(action.error.message);
  });

  it('Тест селектора getStateIngredients', () => {
    const state = { ingredients: initialState };
    const result = getStateIngredients(state);
    expect(result).toEqual(initialState);
  });

  it('Тест селектора getIngredients', () => {
    const state = { ingredients: initialState };
    const result = getIngredients(state);
    expect(result).toEqual(initialState.ingredients);
  });
});

