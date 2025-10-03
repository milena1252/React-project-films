import type { MovieShort } from "../types/types";
import { MovieCard } from "./MovieCard";
import './MovieList.css';

interface FavoriteListProps {
    movies: MovieShort[];
}

export const FavoriteList = ({movies}: FavoriteListProps) => {
    return (
        <div className="movies__container">
            <div className="movies__grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie}/>
                ))}
            </div>
        </div>
    );
};