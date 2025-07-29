import { useEffect } from "react";
import { selectMovie } from "../store/movieSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { MovieCard } from "./MovieCard";
import { Pagination } from "./Pagination";
import { fetchMovies } from "../store/movieThunk";
import './MovieList.css';

export const MovieList = () => {
    const dispatch = useAppDispatch();
    const { 
        movies, 
        isLoading, 
        error, 
        totalResults, 
        searchQuery, 
        currentPage
    } = useAppSelector(selectMovie);

    //автомат-ки загр фильмы при изм-ии параметров
    useEffect (() => {
        if (searchQuery.trim() !== '')
        {
            dispatch(fetchMovies());
        }
    }, [dispatch, searchQuery,currentPage]);

    if (isLoading) {
        return (
            <div className="movies__loading">
                <div className="spinner"></div>
                <p>Loading movies...</p> 
            </div>
        );
    }
        
    if (error) {
        return (
            <div className="movies__error">
                <p>Error:{error}</p>
                <button
                    onClick={() => dispatch(fetchMovies())}
                    className="retry-button"
                >
                        Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="movies__container">
            {movies.length === 0 ? (
                <div className="movies__empty">
                    <p> No movie found. Try a different search.</p>
                </div>
                
            ) : (
                <>
                <div className="movies__grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie}/>
                    ))}
                </div>
                
                {totalResults > 8 && (
                    <div className="movies__pagination">
                        <Pagination 
                            totalItems={totalResults} 
                            itemsPerPage={8}
                            currentPage={currentPage}
                            />
                    </div>
                )}
                </>
            )}
        </div>
    );
};