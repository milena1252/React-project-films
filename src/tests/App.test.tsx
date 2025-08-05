import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { store } from "../store/store";
import App from "../App";
import { Header } from "../components/Layout/Header";

describe("App routing", () => {
    //рендерим App с нач путем
    it("renders Home page on /", async() => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <App/>
                </MemoryRouter>
            </Provider>
        );

        //проверяем что отобразился заголовок стр
        expect(screen.getByText(/Popular Movies/i)).toBeInTheDocument();
    });

     //рендерим App с нач путем search
    it("renders Search page on /search", async() => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/search"]}>
                    <App/>
                </MemoryRouter>
            </Provider>
        );

        //проверяем что отобразился заголовок стр поиска
        expect(screen.getByText(/Search Results/i)).toBeInTheDocument();
    });

})
