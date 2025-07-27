import { Link, useParams } from "react-router"
import { MovieCard } from "../components/MovieCard"
import { useAppDispatch, useAppSelector } from "../store/store";
import { resetMovieDetails, selectMovie } from "../store/movieSlice";
import { useEffect } from "react";
import { fetchMovieById } from "../store/movieThunk";

export const MovieDetails = () => {
    const {id} = useParams<{id: string}>();
    const dispatch = useAppDispatch();
    const {currentMovie, isLoading, error} = useAppSelector(selectMovie);

    useEffect (() => {
        if (id) {
            dispatch(fetchMovieById(id));
        }
        return () => {
            dispatch(resetMovieDetails());
        };
    }, [id, dispatch]);

    if (isLoading) { 
        return <div className="detais__loading">Loading movie details...</div>; 
    }
    
    if (error) { 
        return <div className="details__error">Error: {error}</div>;
    }
    
    if (!currentMovie) return null;

    return (
        <div className="details">
            <Link to='/' className="details__link">→ Back to search</Link>
            <div className="details__container">
                <div className="details__block">
                    <div className="details__card">
                        <MovieCard movie={currentMovie}/>
                    </div>
                    <div className="details__info">
                        <h1 className="details__title">{currentMovie.Title} ({currentMovie.Year})</h1>
                        <div className="details__meta">
                            <span>{currentMovie.Rated}</span>
                            <span>{currentMovie.Runtime}</span>
                            <span>{currentMovie.Genre}</span>
                        </div>

                        <div className="details__plot">
                            <p>{currentMovie.Plot}</p>
                        </div>

                        <div className="details__crew">
                            <div>
                                <h3>Director</h3>
                                <p>{currentMovie.Director}</p>
                            </div>
                            <div>
                                <h3>Writer</h3>
                                <p>{currentMovie.Writer}</p>
                            </div>
                            <div>
                                <h3>Actors</h3>
                                <p>{currentMovie.Actors}</p>
                            </div>
                            <div className="details__additional">
                                <h3>Language</h3>
                                <p>{currentMovie.Language}</p>
                            </div>
                            <div>
                                <h3>Country</h3>
                                <p>{currentMovie.Country}</p>
                            </div>
                            <div>
                                <h3>Awards</h3>
                                <p>{currentMovie.Awards}</p>
                            </div>
                        </div>
                        <div>
                            <div className="details__ratings">
                                <span>IMDb</span>
                                <span>{currentMovie.imdbRating}/10</span>
                            </div>
                            <div>
                                <span>{currentMovie.imdbVotes} votes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};