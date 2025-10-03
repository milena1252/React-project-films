import { Link } from "react-router";
import type { MovieShort } from "../types/types";
import './MovieCard.css';
import type { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { openAuthModal } from "../store/authSlice";
import { addFavorite, removeFavorite, selectFavorites } from "../store/favoritesSlice";

 interface MovieCardProps {
    movie: MovieShort;
 }

export const MovieCard = ({movie}: MovieCardProps) => {
    const dispatch = useAppDispatch();
    const {isAuth} = useAppSelector((state) => state.auth);
    const favorites = useAppSelector(selectFavorites);
    const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

    const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (!isAuth) {
            dispatch(openAuthModal());
            return;
        };

        if (isFavorite) {
            dispatch(removeFavorite(movie.imdbID));
        } else {
            dispatch(addFavorite(movie));
        }
    };

    return (
        <Link to={`/movie/${movie.imdbID}`}>
            <div className="movie__card">
                <img 
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'} 
                alt={movie.Title} 
                className="movie__poster"
                />
                <div className="movie__info">
                    <h3 className="movie__title">{movie.Title}</h3>
                    <div className="movie__meta">
                        <span className="movie__year">{movie.Year}</span>
                        <span className="movie__type">{movie.Type}</span>
                    </div>
                </div>
                {isAuth && (
                    <button
                        onClick={handleFavoriteClick}
                        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                        >
                            ♥
                    </button>
                )}
            </div>
        </Link> 
    );
};