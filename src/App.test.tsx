import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { store } from "./store/store";
import App from "./App";
import { Header } from "./components/Layout/Header";

describe("App routing", () => {
    it("renders Home page on /", async() => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <App/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Popular Movies/i)).toBeInTheDocument();
    });

    it("renders Search page on /search", async() => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/search"]}>
                    <App/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Search Results/i)).toBeInTheDocument();
    });

})

describe("Header component", () => {
    it("renders logo and search form", () => {
        render(
           <Provider store={store}>
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
           </Provider> 
        );

        expect(screen.getByText(/PIXEMA/i)).toBeInTheDocument();
        expect(screen.getAllByPlaceholderText(/Search movies/i)).toBeInTheDocument();
    });

    it("toggles mobile menu", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
            </Provider> 
        );

        const burgerButton = screen.getByRole("button", {name: /menu/i});
        fireEvent.click(burgerButton);
        expect(screen.getByText(/Home/i)).toBeInTheDocument();

        fireEvent.click(burgerButton);
        expect(screen.queryByText(/Home/i)).not.toBeInTheDocument();
    });

    it("navigates to search page on form submit", async () => {
        render(
           <Provider store={store}>
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
            </Provider> 
        );

        const input = screen.getByPlaceholderText(/Search movies/i);
        const submitButton = screen.getByRole("button", {name: /search/i});

        fireEvent.change(input, {target: {value: "test"}});
        fireEvent.click(submitButton);
    });

    it("hides search when showSearch is false", () => {
        render(
           <Provider store={store}>
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
            </Provider> 
        );

        expect(screen.queryByPlaceholderText(/Search movies/i)).not.toBeInTheDocument();
    });
});
