import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MovieFull, MovieShort } from "../types/types";
import { fetchMovieById, fetchMovies} from "./movieThunk";
import type { RootState } from "./store";

interface MovieState {
    movies: MovieShort[];
    currentMovie: MovieFull | null;
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
    totalResults: number;
    currentPage: number;
    filters: {
        year: string;
        type: string;
    };
}

const initialState: MovieState = {
    movies: [],
    currentMovie: null,
    isLoading: false,
    error: null,
    searchQuery: '',
    totalResults: 0,
    currentPage: 1,
    filters: {
        year: '',
        type: 'movie',
    },
};

const movieSlice = createSlice ({
    name: 'movies',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setYearFilter: (state, action: PayloadAction<string>) => {
            state.filters.year = action.payload;
        },
        setTypeFilter: (state, action: PayloadAction<string>) => {
            state.filters.type = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        resetMovieDetails: (state) => {
            state.currentMovie = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchMovies.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.Response === 'True')
            {
                state.movies = action.payload.Search;
                state.totalResults = parseInt(action.payload.totalResults);
            } else {
                state.error = action.payload.Error || 'Unknown error';
                state.movies = [];
                state.totalResults = 0;
            }
        })
        .addCase(fetchMovies.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch movie';
        })

         
        .addCase(fetchMovieById.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchMovieById.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.Response === 'True')
            {
                state.currentMovie = action.payload;
            } else {
                state.error = action.payload.Error || 'Movie not found';
            }
        })
        .addCase(fetchMovieById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch movie details';
        })
    }
});

export const{
    setSearchQuery,
    setYearFilter,
    setTypeFilter,
    setPage,
    resetMovieDetails,
} = movieSlice.actions;

export const selectMovie = (state: RootState) => state.movie;

export default movieSlice.reducer;