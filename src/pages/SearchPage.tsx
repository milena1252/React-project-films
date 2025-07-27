import { MovieList } from "../components/MovieList";
import { Search } from "../components/Search";

export const SearchPage = () => {
    return (
        <div className="search-page">
            <h1>Movie Search</h1>
            <Search />
            <MovieList />
        </div>
    );
};