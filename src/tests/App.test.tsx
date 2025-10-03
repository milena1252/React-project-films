import { screen } from "@testing-library/react";
import App from "../App";
import { renderWithProviders } from "./utils";


describe("App routing", () => {
    //рендерим App с нач путем search
    it("renders Search page on /", async() => {
       renderWithProviders(<App/>, { initialEntries: ["/"] })

       //проверяем что отобразился заголовок стр поиска
       expect(screen.getByText(/Search Results/i)).toBeInTheDocument();
    });
})
