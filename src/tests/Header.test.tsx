import { fireEvent, screen } from "@testing-library/react";
import { Header } from '../components/Layout/Header';
import { renderWithProviders } from "./utils";

describe("Header component", () => {
    it("renders logo and search form", () => {
        renderWithProviders(<Header />);

        //проверяем наличие логотипа и поля поиска
        expect(screen.getByText(/PIX/i)).toBeInTheDocument();
        const input = screen.getByTestId('search-input');
        expect(input).toBeInTheDocument();
    });

    //переключает на бургер-меню
    it("toggles mobile menu", () => {
        renderWithProviders(<Header />);
        //находим кнопку бургер-меню
        const burgerButton = screen.getByTestId("burger-menu-btn");
        //кликаем для открытия меню и проверяем отображение
        fireEvent.click(burgerButton);
        expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
    });
});
