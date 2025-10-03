import { configureStore } from "@reduxjs/toolkit";
import type { AuthState } from "../store/authSlice";
import type { MovieShort } from "../types/types";
import type { FavoriteState } from "../store/favoritesSlice";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MovieCard } from "../components/MovieCard";
import { vi } from "vitest";

//моковый фильм
const mockMovie: MovieShort = {
    imdbID: 'tt1234567',
    Title: 'Test Movie',
    Year: '2021',
    Type: 'movie',
    Poster: 'http://test.com/poster.jpg'
};

//моковый стор
const createMockStore = (
    authState: AuthState = {
        isAuth: false,
        username: null,
        isAuthModalOpen: false,
        authError: null
    } , 
    favorites: MovieShort[] = []
) => {
    return configureStore({
        reducer: {
            auth: () => authState,
            favorites: () => ({movies: favorites}) as FavoriteState
        }
    });
};

describe('MovieCard', () => {
    //рендерит инф-ию о фильме корректно
    it('render movie correctly', () => {
        const store = createMockStore();

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MovieCard movie={mockMovie}/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(mockMovie.Title)).toBeInTheDocument();
        expect(screen.getByText(mockMovie.Year)).toBeInTheDocument();
        expect(screen.getByText(mockMovie.Type)).toBeInTheDocument();
        //ищем img по alt-тексту alt={movie.Title}
        expect(screen.getByAltText(mockMovie.Title)).toHaveAttribute('src', mockMovie.Poster);
    });

    //не показ кнопку избр для неавториз пользователей
    it('not show favorites for unauthorized users', () => {
        const store = createMockStore();

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MovieCard movie={mockMovie}/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.queryByText('♥')).not.toBeInTheDocument();
    });

    //показ кнопку избр для авториз пользователей
    it('show favorites for authorized users', () => {
        const store = createMockStore({
            isAuth: true,
            username: null,
            isAuthModalOpen: false,
            authError: null
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MovieCard movie={mockMovie}/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.queryByText('♥')).toBeInTheDocument();
    });

    //добавляет фильм в избр при клике
    it('add movie to favorites on click', () => {
         const store = createMockStore({
            isAuth: true,
            username: null,
            isAuthModalOpen: false,
            authError: null
        });
        store.dispatch = vi.fn();

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MovieCard movie={mockMovie}/>
                </MemoryRouter>
            </Provider>
        );

        //находим кнопку и имитируем нажатие на нее
        fireEvent.click(screen.getByText('♥'));
        //проверяем что вызван dispatch с указ действием
        expect(store.dispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                //проверяем что объект содежит указ поля
                type: 'favorites/addFavorite',
                payload: mockMovie
            })
        );
    });
})
