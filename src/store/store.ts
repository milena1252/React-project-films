import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movieReducer from './movieSlice';
import authReducer from './authSlice';
import favoritesReducer from './favoritesSlice';
import settingsReducer from './settingsSlice';
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
    movie: movieReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    settings: settingsReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()