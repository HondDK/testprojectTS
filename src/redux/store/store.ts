import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { RootState } from '../types';
import rootReducer from "../RootReducers";

// Конфигурация для redux-persist
const persistConfig = {
    key: 'root',
    storage,
};

// Создание персистентного редьюсера
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

// Создание Redux-хранилища
export const store = configureStore({
    reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;