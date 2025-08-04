import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './movieSlice';
import authReducer from './authSlice';
import favoritesReducer from './favoritesSlice';
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore ({
    reducer: {
        movie: movieReducer,
        auth: authReducer,
        favorites: favoritesReducer,
    },
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()