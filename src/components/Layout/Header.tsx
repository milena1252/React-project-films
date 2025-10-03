import { Link, useLocation, useNavigate } from "react-router";
import { AuthSection } from "../Auth/AuthSection";
import './Layout.css';
import { IoClose, IoMenu, IoSearchOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { resetSearch, selectMovie, setSearchQuery } from "../../store/movieSlice";
import { useEffect, useState, type ChangeEvent} from "react";
import { fetchMovies } from "../../store/movieThunk";
import { AiFillSetting } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { useWindow } from "../../hooks/useWindow";
import useDebounce from "../../hooks/useDebounce";

const popularQueries = ['avengers', 'batman', 'superhero', 'action']; //популярные запросы

export const Header = () => {
    const { isLg } = useWindow();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { searchQuery, filters } = useAppSelector(selectMovie);
    const debounceTime = isLg ? 2000 : 800;
    const debouncedSearchQuery = useDebounce(searchQuery, debounceTime);

    const getRandomQuery = () => {
        return popularQueries[Math.floor(Math.random() * popularQueries.length)];
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(event.target.value))
    };

    // Функция для сброса поиска
    const handleResetSearch = () => {
        dispatch(resetSearch());
    };

    // Функция для очистки поля поиска
    const handleClearSearch = () => {
        const newRandomQuery = getRandomQuery();
        dispatch(setSearchQuery(newRandomQuery));
        dispatch(fetchMovies({
            searchQuery: newRandomQuery,
            filters,
            page: 1
        }));
    };

    //обработчик для ручного поиска
    const handleSearchSubmit = () => {
        if (searchQuery) {
            dispatch(fetchMovies({ searchQuery, filters, page: 1 }));
            if (location.pathname !== '/') {
                navigate('/')
            }
        }
    };

    // автопоиск ТОЛЬКО на главной странице
    useEffect(() => {
        if (location.pathname === '/') {
        // Выполняем поиск только если есть поисковый запрос
            if (debouncedSearchQuery) {
                dispatch(fetchMovies({ searchQuery: debouncedSearchQuery, filters, page: 1 }));
            } else {
                const newRandomQuery = getRandomQuery();
                dispatch(setSearchQuery(newRandomQuery));
                dispatch(fetchMovies({searchQuery: newRandomQuery, filters, page: 1}));
            }
        }
    }, [debouncedSearchQuery, dispatch, filters, location.pathname]);

    // Эффект для сброса поиска при переходе на другие страницы
    useEffect(() => {
        if (location.pathname !== '/') {
            dispatch(resetSearch());
        }
    }, [location.pathname, dispatch]);

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

            <Link to="/" className="header__logo" onClick={handleResetSearch}>
                <span>PIX</span>EMA
            </Link>
            
                <div className="search__container">
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={handleChange}
                        placeholder="Search movies..."
                        className="search__input"
                        data-testid="search__input"
                    />
                    <button className="search__button"
                    onClick={handleSearchSubmit}
                    >
                        <IoSearchOutline />
                    </button>

                    {searchQuery && (
                        <button
                        type="button"
                        onClick={handleClearSearch}
                        className="search__clear-btn"
                        >
                            <IoClose/>
                        </button>
                    )}
                </div>

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