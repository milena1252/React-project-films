import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, BASE_URL } from "../constants/api";
import type { RootState } from "./store";
import axios from "axios";

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, {getState}) => {
    const state = getState() as RootState;
    const { searchQuery, filters, currentPage } = state.movie;

    if (!searchQuery.trim()) return { Search: [], totalResults: '0'};

    const response = await axios.get (
      BASE_URL, {
        params: {
          apikey: API_KEY,
          s: searchQuery,
          page: currentPage,
          y: filters.year,
          type: filters.type,
        },
      });
      return {
        ...response.data,
        Search: (response.data.Search || []).slice(0, 8)
      };
    }
);
 
export const fetchMovieById = createAsyncThunk(
    'movies/fetchMovieById',
  async (id: string) => {
    const response = await axios.get (BASE_URL, {
        params: {
          apikey: API_KEY,
          i: id,
          plot: 'full'
        }
      });
      return response.data;
    }
);