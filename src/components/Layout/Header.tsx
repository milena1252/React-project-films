import { Link, useNavigate } from "react-router";
import { AuthSection } from "./AuthSection";
import './Layout.css';
import { IoMenu, IoSearchOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectMovie, setSearchQuery } from "../../store/movieSlice";
import { useEffect, useState, type ChangeEvent } from "react";
import { fetchMovies } from "../../store/movieThunk";
import { AiFillSetting } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import useDebounce from "../../hooks/useDebounce";
import { useWindow } from "../../hooks/useWindow";

const popularQueries = ['avengers', 'batman', 'superhero', 'action'];//популярные запросы
const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];

export const Header = () => {
    const { isLg } = useWindow();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { searchQuery, filters } = useAppSelector(selectMovie);
    const debouncedSearchQuery = useDebounce(searchQuery, 2000);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(event.target.value))
    };

    useEffect(() => {
        if (isLg) {
            if (!searchQuery) {
                //выбор случайного запроса
                dispatch(setSearchQuery(randomQuery));
            }
        }
    }, [dispatch, searchQuery, isLg]);

    // Эффект для автоматического поиска при изменении debounced значения
    useEffect(() => {
        if (isLg) {
        // Выполняем поиск только если есть поисковый запрос
            if (debouncedSearchQuery) {
                dispatch(fetchMovies({ searchQuery: debouncedSearchQuery, filters }));
                if (window.location.pathname !== '/') {
                    navigate('/');
                }
            }
        }
    }, [debouncedSearchQuery, dispatch, filters, navigate, isLg]);
  
    return (
        <>
        <header className="header">
            <button
                className="burger-menu"
                data-testid="burger-menu-btn"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                <IoMenu size={24} /> 
            </button>

            <Link to="/" className="header__logo">
                <span>PIX</span>EMA
            </Link>
            
            {isLg && (
                <div className="search__container">
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={handleChange}
                        placeholder="Search movies..."
                        className="search__input"
                        data-testid="search-input"
                    />
                    <button className="search__button" data-testid="search-outline">
                        <IoSearchOutline />
                    </button>
                </div>
            )}
            <AuthSection/>
        </header>

         <nav className={`mobile-nav ${isMobileOpen ? 'open' : ''}`}>
                <Link to="/" className="mobile-nav__link" onClick={() => setIsMobileOpen(false)}>
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