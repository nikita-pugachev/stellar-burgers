import {
  userLogin,
  userRegistration,
  userEdit,
  userInfo,
  userLogout,
  userSlice,
  getCheckLogin,
  getUser
} from './userSlice';

export const initialState  = {
  user: null,
  isLogin: false,
  loading: false,
  errors: null
};

const mockedUserData = {
    email: 'test@test.com',
    name: 'Test User'
}

describe("Тестирование данных пользователя", () => {
    it("Тест логина пользователя в состоянии pending", () => {
        const state = userSlice.reducer(initialState, {
            type: userLogin.pending.type
        });
        expect(state.loading).toEqual(true);
        expect(state.errors).toBeNull();
    });

    it("Тест логина пользователя в состоянии fulfilled", () => {
        const state = userSlice.reducer(initialState, {
            type: userLogin.fulfilled.type,
            payload: { user: mockedUserData }
        });
        expect(state.user).toEqual(mockedUserData);
        expect(state.isLogin).toEqual(true);
        expect(state.loading).toEqual(false);
    });

    it("Тест логина пользователя в состоянии rejected", () => {
        const action = {
            type: userLogin.rejected.type,
            error: { message: 'Ошибка входа в аккаунт' }
        };
        const state = userSlice.reducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.errors).toBe(action.error.message);
    });

    it("Тест регистрации пользователя в состоянии pending", () => {
        const state = userSlice.reducer(initialState, {
            type: userRegistration.pending.type
        });
        expect(state.loading).toEqual(true);
        expect(state.errors).toBeNull();
    });

    it("Тест регистрации пользователя в состоянии fulfilled", () => {
        const state = userSlice.reducer(initialState, {
            type: userRegistration.fulfilled.type,
            payload: { user: mockedUserData }
        });
        expect(state.user).toEqual(mockedUserData);
        expect(state.isLogin).toEqual(true);
        expect(state.loading).toEqual(false);
    });

    it("Тест регистрации пользователя в состоянии rejected", () => {
        const action = {
            type: userRegistration.rejected.type,
            error: { message: 'Ошибка! Регистрация не завершена' }
        };
        const state = userSlice.reducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.errors).toBe(action.error.message);
    });

    it("Тест изменения данных пользователя в состоянии fulfilled", () => {
        const state = userSlice.reducer(initialState, {
            type: userEdit.fulfilled.type,
            payload: { user: mockedUserData }
        });
        expect(state.user).toEqual(mockedUserData);
        expect(state.isLogin).toEqual(true);
    });

    it("Тест получения данных пользователя в состоянии fulfilled", () => {
        const state = userSlice.reducer(initialState, {
            type: userInfo.fulfilled.type,
            payload: { user: mockedUserData }
        });
        expect(state.user).toEqual(mockedUserData);
        expect(state.isLogin).toEqual(true);
    });

    it("Тест выхода пользователя в состоянии fulfilled", () => {
        const state = userSlice.reducer(initialState, {
            type: userLogout.fulfilled.type
        });
        expect(state.user).toBeNull();
        expect(state.isLogin).toEqual(false);
    });

    it("Тест селектора getCheckLogin", () => {
        const state = {
            user: {
                user: mockedUserData,
                isLogin: true,
                loading: false,
                errors: null
            }
        };
        const result = getCheckLogin(state);
        expect(result).toEqual(true);
    });

    it("Тест селектора getUser", () => {
        const state = {
            user: {
                user: mockedUserData,
                isLogin: true,
                loading: false,
                errors: null
            }
        };
        const result = getUser(state);
        expect(result).toEqual(mockedUserData);
    });
});