import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { store } from "../store/store";
import { Header } from "../components/Layout/Header";

describe("Header component", () => {
    it("renders logo and search form", () => {
        render(
           <Provider store={store}>
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
           </Provider> 
        );

        //проверяем наличие логотипа и поля поиска
        expect(screen.getByText(/PIXEMA/i)).toBeInTheDocument();
        expect(screen.getAllByPlaceholderText(/Search movies/i)).toBeInTheDocument();
    });

    //переключает на бургер-меню
    it("toggles mobile menu", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
            </Provider> 
        );

        //находим кнопку бургер-меню
        const burgerButton = screen.getByRole("button", {name: /menu/i});
        //кликаем для открытия меню и проверяем отображение
        fireEvent.click(burgerButton);
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        //кликаем еще раз и проверяем скрытие
        fireEvent.click(burgerButton);
        expect(screen.queryByText(/Home/i)).not.toBeInTheDocument();
    });

    //переходим на стр поиска при submit формы
    it("navigates to search page on form submit", async () => {
        render(
           <Provider store={store}>
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
            </Provider> 
        );

        //находим элементы формы поиска
        const input = screen.getByPlaceholderText(/Search movies/i);
        const submitButton = screen.getByRole("button", {name: /search/i});

        //имитируем ввод текста и отправку формы
        fireEvent.change(input, {target: {value: "test"}});
        fireEvent.click(submitButton);

        //проверяем изменение URL/роутинга
        expect(screen.getByText(/Search Results/i)).toBeInTheDocument();
    });

    //скрываем search
    it("hides search when showSearch is false", () => {
        render(
           <Provider store={store}>
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
            </Provider> 
        );

        //проверяем отсутствие поля поиска
        expect(screen.queryByPlaceholderText(/Search movies/i)).not.toBeInTheDocument();
    });
});
