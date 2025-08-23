import { useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/store"
import { useEffect } from "react";
import { fetchMovies } from "../store/movieThunk";
import useDebounce from "./useDebounce";

export const useSearchOnRoute = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { searchQuery, filters } = useAppSelector((state) => state.movie);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (location.pathname === '/' && debouncedSearchQuery) {
            setTimeout(() => {
                dispatch(fetchMovies({ searchQuery: debouncedSearchQuery, filters }));
            }, 100);
        }
    }, [location.pathname, debouncedSearchQuery, dispatch, filters]);
}