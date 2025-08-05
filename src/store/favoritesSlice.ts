import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MovieShort } from "../types/types";

export interface FavoriteState {
    movies: MovieShort[];
}

const initialState : FavoriteState = {
    movies: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<MovieShort>) => {
            if (!state.movies.some(movie => movie.imdbID === action.payload.imdbID)) {
                state.movies.push(action.payload);
                localStorage.setItem('favorites', JSON.stringify(state.movies));
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.movies = state.movies.filter(movie => movie.imdbID !== action.payload);
            localStorage.setItem('favorites', JSON.stringify(state.movies));
        },
        clearFavorites: (state) => {
            state.movies = [];
        },
    },
});

export const {addFavorite, removeFavorite, clearFavorites} = favoritesSlice.actions;
export const selectFavorites = (state: {favorites: FavoriteState}) => state.favorites.movies;
export default favoritesSlice.reducer;