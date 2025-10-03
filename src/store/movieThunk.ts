import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, BASE_URL } from "../constants/api";
import type { RootState } from "./store";
import axios from "axios";

interface FetchMoviesParams {
  searchQuery: string,
  filters?: {
    year: string;
    type: string;
  };
  page?: number;
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({searchQuery, filters, page}: FetchMoviesParams, {getState}) => {
    const state = getState() as RootState;

    const targetPage = page !== undefined ? page : state.movie.currentPage;

    // Если поисковый запрос пустой, возвращаем пустой результат
    if (!searchQuery.trim()) return { Search: [], totalResults: '0'};

    try{
    const response = await axios.get (
      BASE_URL, {
        params: {
          apikey: API_KEY,
          s: searchQuery,
          page: targetPage,
          y: filters?.year,
          type: filters?.type,
        },
      });

      if (response.data.Error) {
        throw new Error(response.data.Error);
      }

      return {
        ...response.data,
        Search: (response.data.Search || []).slice(0, 8),
        currentPage: targetPage,
      };
    } catch(error) {
      console.error('Error:', error);
      throw error; // Просто пробрасываем ошибку дальше
    }
  }
);
 
export const fetchMovieById = createAsyncThunk(
    'movies/fetchMovieById',
  async (id: string) => {
    try{
      const response = await axios.get (BASE_URL, {
        params: {
          apikey: API_KEY,
          i: id,
          plot: 'full'
        }
      });

      if (response.data.Error) {
        throw new Error(response.data.Error);
      }

      return response.data;
      } catch(error) {
        console.error('Error:', error)
        throw error; 
      }
    }
);