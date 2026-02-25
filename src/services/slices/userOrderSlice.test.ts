import { userOrders, getUserOrders, userOrdersSlice } from './userOrderSlice';

const initialState = {
  orders: [],
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

describe('Тестирование заказов пользователя', () => {
  it('Загрузка заказов пользователя в состоянии pending', () => {
    const state = userOrdersSlice.reducer(initialState, {
      type: userOrders.pending.type
    });
    expect(state.loading).toEqual(true);
    expect(state.errors).toBeNull();
  });

  it('Загрузка заказов пользователя в состоянии fulfilled', () => {
    const state = userOrdersSlice.reducer(initialState, {
      type: userOrders.fulfilled.type,
      payload: mockedDataFetch
    });
    expect(state.orders).toEqual(mockedDataFetch);
    expect(state.loading).toEqual(false);
  });

  it('Загрузка заказов пользователя в состоянии rejected', () => {
    const action = {
      type: userOrders.rejected.type,
      error: { message: 'При загрузке заказов произошла ошибка' }
    };
    const state = userOrdersSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.errors).toBe(action.error.message);
  });

  it('Тест селектора getUserOrders', () => {
    const state = {
      userOrder: {
        orders: [mockedDataFetch.order],
        loading: false,
        errors: null
      }
    };
    const selectedOrders = getUserOrders(state);
    expect(selectedOrders).toEqual(state.userOrder.orders);
  });
});
