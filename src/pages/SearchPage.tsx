import { MovieList } from "../components/MovieList";
import { Search } from "../components/Search";
import './HomePage.css';

export const SearchPage = () => {
    return (
        <div className="search-page">
            <h1  className="search-page_title">Search Results</h1>
            <Search />
            <MovieList />
        </div>
    );
};