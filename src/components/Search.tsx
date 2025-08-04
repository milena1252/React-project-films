import type { FormEvent } from "react";
import { selectMovie, setSearchQuery, setTypeFilter, setYearFilter } from "../store/movieSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchMovies } from "../store/movieThunk";
import './Search.css'
import { useNavigate } from "react-router";

export const Search = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {searchQuery, filters} = useAppSelector(selectMovie);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        dispatch(fetchMovies());

        //перенапр на стр поиска, если мы не на ней
        if (window.location.pathname !== '/search') {
        navigate('/search');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search">
            <div className="search__group">
                <input 
                type="text" 
                value={searchQuery}
                onChange={(event) => dispatch(setSearchQuery(event.target.value))}
                placeholder="Search movies..."
                className="search__inp"
                />

                <div className="search__select-group">
                    <select 
                value={filters.year}
                onChange={(event) => dispatch(setYearFilter(event.target.value))}
                className="search__select"
                >
                    <option value="">All years</option>
                    {Array.from({length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => 
                        ( 
                            <option key={year} value={year}>{year}</option>
                        ))}
                </select>

                <select 
                value={filters.type}
                onChange={(event) => dispatch(setTypeFilter(event.target.value))}
                className="search__select"
                >
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                    <option value="episode">Episode</option>
                    <option value="game">Game</option>
                </select>

                 <button 
                type="submit"
                className="search__btn"
                >
                    Search
                </button>
                </div>
                

               
            </div>
        </form>
    );
};