import { configureStore } from '@reduxjs/toolkit';
import constructorReducer from './slices/constructorSlice';
import feedReducer from './slices/feedSlice';
import ingredientReducer from './slices/ingredientSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import userOrdersReducers from './slices/userOrderSlice';
import { combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  user: userReducer,
  feed: feedReducer,
  order: orderReducer,
  contructor: constructorReducer,
  userOrder: userOrdersReducers
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
