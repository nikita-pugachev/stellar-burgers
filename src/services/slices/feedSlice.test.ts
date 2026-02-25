import { feedFetch, getStateFeed, getOrders, feedSlice } from './feedSlice';

export const initialState = {
  orders: [],
  total: 0,
  totalDay: 0,
  loading: false,
  errors: null
};

const mokedDataFetch = {
  success: true,
  orders: [
    {
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
      number: 101530
    }
  ],
  total: 11,
  totalToday: 1
};

describe('Тестирование ленты заказов', () => {
  it('Тест редьюсера на получение данных ленты заказов', () => {
    const state = feedSlice.reducer(initialState, {
      type: feedFetch.fulfilled.type,
      payload: mokedDataFetch
    });
    expect(state.orders).toEqual(mokedDataFetch.orders);
    expect(state.total).toEqual(mokedDataFetch.total);
    expect(state.totalDay).toEqual(mokedDataFetch.totalToday);
  });

  it('Тест селектора getStateFeed', () => {
    const state = { feed: initialState };
    const result = getStateFeed(state);
    expect(result).toEqual(initialState);
  });

  it('Тест селектора getOrders', () => {
    const state = { feed: initialState };
    const result = getOrders(state);
    expect(result).toEqual(initialState.orders);
  });
});
