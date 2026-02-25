import {
  getstateOrder,
  clearOrder,
  newOrder,
  countOrder,
  orderSlice
} from './orderSlice';

export const initialState = {
  order: null,
  count: null,
  loading: false,
  errors: null
};

const mockedDataFetch = {
  success: true,
  order: {
    _id: '699c4b10a64177001b32d0de',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0946',
      '643d69a5c3f7b9001cfa093d'
    ],
    owner: '699b3fc8a64177001b32cf5f',
    status: 'done',
    name: 'Минеральный флюоресцентный люминесцентный бургер',
    createdAt: '2026-02-23T12:41:52.237Z',
    updatedAt: '2026-02-23T12:41:52.447Z',
    number: 1
  }
};

describe('Тест работы заказов', () => {
  it('Тест на оформление нового заказа при загрузке', () => {
    const state = orderSlice.reducer(initialState, {
      type: newOrder.pending.type
    });
    expect(state.loading).toEqual(true);
    expect(state.errors).toBeNull();
  });

  it('Тест на оформление нового заказа при успешной загрузке', () => {
    const state = orderSlice.reducer(initialState, {
      type: newOrder.fulfilled.type,
      payload: mockedDataFetch
    });
    expect(state.order).toEqual(mockedDataFetch.order);
    expect(state.loading).toEqual(false);
  });

  it('Тест на оформление нового заказа при ошибке', () => {
    const action = {
      type: newOrder.rejected.type,
      error: { message: 'При оформлении заказа произошла ошибка' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.errors).toBe(action.error.message);
  });

  it('Тест на получение номера заказа при загрузке', () => {
    const state = orderSlice.reducer(initialState, {
      type: countOrder.pending.type
    });
    expect(state.loading).toEqual(true);
    expect(state.errors).toBeNull();
  });

  it('Тест на получение номера заказа при успешной загрузке', () => {
    const state = orderSlice.reducer(initialState, {
      type: countOrder.fulfilled.type,
      payload: mockedDataFetch.order
    });
    expect(state.order).toEqual(mockedDataFetch.order);
    expect(state.loading).toEqual(false);
  });

  it('Тест на получение номера заказа при ошибке загрузки', () => {
    const action = {
      type: countOrder.rejected.type,
      error: { message: 'Произошла ошибка! Попробуйте снова' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.errors).toBe(action.error.message);
  });

  it('Тест редьюсера для отчиски данных заказа', () => {
    const oldState = {
      order: {
        _id: '699c4b10a64177001b32d0de',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa093d'
        ],
        owner: '699b3fc8a64177001b32cf5f',
        status: 'done',
        name: 'Минеральный флюоресцентный люминесцентный бургер',
        createdAt: '2026-02-23T12:41:52.237Z',
        updatedAt: '2026-02-23T12:41:52.447Z',
        number: 1
      },
      count: 1,
      loading: false,
      errors: null
    };
    const state = orderSlice.reducer(oldState, clearOrder());
    expect(state).toEqual(initialState);
  });
  it("Тест селектора getstateOrder", () => {
    const state = {
        order: initialState
    };
    expect(getstateOrder(state)).toEqual(initialState);
  });
});
