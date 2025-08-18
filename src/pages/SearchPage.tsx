import { MovieList } from "../components/MovieList";
import { Search } from "../components/Search";

export const SearchPage = () => {
    return (
        <div className="search-page">
            <h1  className="search-page_title">Search Results</h1>
            <Search />
            <MovieList />
        </div>
    );
};