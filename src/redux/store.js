import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { user } from './features/user/userApiSlice';
import authReducer from "./authSlice";
import { applications } from './features/applications/applicationsApiSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'auth'],
};

const rootReducer = combineReducers({
    [user.reducerPath]: user.reducer,
    [applications.reducerPath]: applications.reducer,
    auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
            }
        }).concat(user.middleware, applications.middleware)
});


export const persistor = persistStore(store);