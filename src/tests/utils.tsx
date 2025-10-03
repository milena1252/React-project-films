import React, { type PropsWithChildren } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { setupStore, type AppStore, type RootState } from "../store/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store?: AppStore,
    initialEntries?: string[],
}

export function renderWithProviders (
    ui: React.ReactElement,
    extendedRenderOtions: ExtendedRenderOptions = {}
) {
    const {
        preloadedState = {},
    // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    } = extendedRenderOtions

    const Wrapper = ({ children}: PropsWithChildren) => (
        <Provider store={store}>
            <MemoryRouter>
                {children}
            </MemoryRouter>
        </Provider>
    )

     // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...render(ui, {wrapper: Wrapper, ...renderOptions})
    }
}