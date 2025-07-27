import { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { fetchMovies } from "../store/movieThunk";
import { setSearchQuery } from "../store/movieSlice";
import { MovieList } from "../components/MovieList";

export const HomePage = () => {
    const dispatch = useAppDispatch();
    
    //при загрузке стр выполняем поиск по попул фильмам
    useEffect(() => {
        dispatch(setSearchQuery('action'));
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