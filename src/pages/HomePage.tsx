import { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { fetchMovies } from "../store/movieThunk";
import { setSearchQuery } from "../store/movieSlice";
import { MovieList } from "../components/MovieList";
import './HomePage.css';

export const HomePage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const popularQueries = ['avengers', 'batman', 'superhero', 'action'];
        const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
  
        dispatch(setSearchQuery(randomQuery));
        dispatch(fetchMovies());
    }, [dispatch]);

    return (
       <div className="home-page">
            <div className="home-page__header">
                <h2>Popular Movies</h2>
                <p>Browse our collection of popular films</p>
            </div>
            <MovieList/>
       </div>
    );
};