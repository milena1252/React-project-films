import { Link, useNavigate } from "react-router";
import { AuthSection } from "./AuthSection";
import './Layout.css';
import { IoHomeOutline, IoMenu, IoSearchOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectMovie, setSearchQuery } from "../../store/movieSlice";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { fetchMovies } from "../../store/movieThunk";
import { AiFillSetting } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { GoSearch } from "react-icons/go";

interface HeaderProps {
    showSearch?: boolean;
}

export const Header = ({showSearch = true}: HeaderProps) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
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
        <>
        <header className="header">
            <button
                className="burger-menu"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                <IoMenu size={24} /> 
            </button>

            <Link to="/" className="header__logo">
                <span>PIX</span>EMA
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

         <nav className={`mobile-nav ${isMobileOpen ? 'open' : ''}`}>
                <Link to="/" className="mobile-nav__link" onClick={() => setIsMobileOpen(false)}>
                    <IoHomeOutline />
                    <span>Home</span>
                </Link>
                <Link to="/search" className="mobile-nav__link" onClick={() => setIsMobileOpen(false)}>
                    <GoSearch />
                    <span>Search</span>
                </Link>
                <Link to="/favorites" className="mobile-nav__link" onClick={() => setIsMobileOpen(false)}>
                    <MdFavoriteBorder />
                    <span>Favorites</span>
                </Link>
                <Link to="/settings" className="mobile-nav__link" onClick={() => setIsMobileOpen(false)}>
                    <AiFillSetting />
                    <span>Settings</span>
                </Link>
            </nav>
        </>        
    );
};