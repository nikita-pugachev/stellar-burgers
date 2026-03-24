import {
  addIngredients,
  removeIngredient,
  moveIngredients,
  clearIngredients,
  constructorSlice
} from './constructorSlice';
import { TIngredient } from '@utils-types';

const mockedBun: TIngredient = {
    "_id": "643d69a5c3f7b9001cfa093d",
    "name": "Флюоресцентная булка R2-D3",
    "type": "bun",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
};

const mokedIngredient: TIngredient = {
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
};

const mockedSauce: TIngredient = {
    "_id": "643d69a5c3f7b9001cfa0942",
    "name": "Соус Spicy-X",
    "type": "sauce",
    "proteins": 30,
    "fat": 20,
    "carbohydrates": 40,
    "calories": 30,
    "price": 90,
    "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
}

describe("Тестирование конструктора", () => {
    it('Тест редьюсера на добавление булки в конструктор', () => {
        const initialState = {
            bun: null,
            ingredients: [],
            total: 0
        };

        const reducer = addIngredients(mockedBun);
        const state = constructorSlice.reducer(initialState, reducer);

        expect(state.bun?._id).toBe(mockedBun._id);
        expect(state.bun?.name).toBe(mockedBun.name);
    });

    it('Тест редьюсера на добавление ингридиента в конструктор', () => {
        const initialState = {
            bun: null,
            ingredients: [],
            total: 0
        };

        const reducer = addIngredients(mokedIngredient);
        const state = constructorSlice.reducer(initialState, reducer);

        expect(state.ingredients.length).toBe(1);
        expect(state.ingredients).toMatchObject([mokedIngredient]);
    });

    it('Тест редьюсера на перемещение ингредиентов в конструкторе', () => {
        const initialState = {
            bun: null,
            ingredients: [
                { ...mokedIngredient, id: '1' },
                { ...mockedSauce, id: '2' }
            ],
            total: 0
        };

        const action = moveIngredients({ oldPosition: 1, newPosition: 0 });
        const state = constructorSlice.reducer(initialState, action);

        expect(state.ingredients[0]._id).toBe(mockedSauce._id);
        expect(state.ingredients[1]._id).toBe(mokedIngredient._id);
    });

    it('Тест редьюсера на удаление ингредиента из конструктора', () => {
        const initialState = {
            bun: null,
            ingredients: [
                { ...mokedIngredient, id: '1' },
                { ...mockedSauce, id: '2' }
            ],
            total: 0
        };

        const action = removeIngredient('1');
        const state = constructorSlice.reducer(initialState, action);

        expect(state.ingredients.length).toBe(1);
        expect(state.ingredients[0]._id).toBe(mockedSauce._id);
    });

    it('Тест редьюсера на очистку конструктора', () => {
        const initialState = {
            bun: null,
            ingredients: [
                { ...mokedIngredient, id: '1' },
                { ...mockedSauce, id: '2' }
            ],
            total: 0
        };

        const action = clearIngredients();
        const state = constructorSlice.reducer(initialState, action);

        expect(state.bun).toBeNull();
        expect(state.ingredients.length).toBe(0);
        expect(state.total).toBe(0);
    })

});
