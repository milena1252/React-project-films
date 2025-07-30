import { Link, useNavigate } from "react-router";
import { AuthSection } from "./AuthSection";
import './Layout.css';
import { IoSearchOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectMovie, setSearchQuery } from "../../store/movieSlice";
import type { ChangeEvent, FormEvent } from "react";
import { fetchMovies } from "../../store/movieThunk";

interface HeaderProps {
    showSearch?: boolean;
}

export const Header = ({showSearch = true}: HeaderProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { searchQuery } = useAppSelector(selectMovie);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            dispatch(fetchMovies());
            navigate('/search');
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(event.target.value))
    };
  
    return (
        <header className="header">
            <Link to="/" className="header__logo">
                Logo
            </Link>
            
            {showSearch && (
                <form onSubmit={handleSubmit} className="search__container">
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={handleChange}
                        placeholder="Search movies..."
                        className="search__input"
                    />
                    <button type="submit" className="search__button">
                        <IoSearchOutline />
                    </button>
                </form>
            )}
            <AuthSection/>
        </header>
    );
};