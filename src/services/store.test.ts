import { rootReducer } from './store';

describe('Тестирование rootReducer', () => {
  it('Проверка работы rootReducer', () => {
    const reducers = rootReducer(undefined, { type: '' });
    expect(reducers).toHaveProperty('ingredients');
    expect(reducers).toHaveProperty('user');
    expect(reducers).toHaveProperty('feed');
    expect(reducers).toHaveProperty('order');
    expect(reducers).toHaveProperty('contructor');
    expect(reducers).toHaveProperty('userOrder');
  });
});
